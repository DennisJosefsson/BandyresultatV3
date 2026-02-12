import { db } from '@/db'
import { series, tables, teamgames, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { MaratonTable } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import {
  SQL,
  and,
  asc,
  count,
  countDistinct,
  desc,
  eq,
  sql,
  sum,
} from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'

type TablesReturn =
  | {
      status: 200
      tables: MaratonTable[]
      breadCrumb: string
      meta: { title: string; url: string }
    }
  | undefined

export const getMaratonTables = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        women: zd.boolean(),
        table: zd.enum(['all', 'home', 'away']).catch('all'),
      }),
    ),
  )
  .handler(async ({ data: { women, table } }): Promise<TablesReturn> => {
    try {
      const staticTables = db
        .select({
          teamId: tables.teamId,
          seasons: countDistinct(tables.seasonId).as('seasons'),
          totalGames: sum(tables.games).mapWith(Number).as('total_games'),
          totalPoints: sum(tables.points).mapWith(Number).as('total_points'),
          totalGoalsScored: sum(tables.scoredGoals)
            .mapWith(Number)
            .as('total_goals_scored') as unknown as SQL<number>,
          totalGoalsConceded: sum(tables.concededGoals)
            .mapWith(Number)
            .as('total_goals_conceded') as unknown as SQL<number>,
          totalGoalDifference: sum(tables.goalDifference)
            .mapWith(Number)
            .as('total_goal_difference') as unknown as SQL<number>,
          totalWins: sum(tables.won)
            .mapWith(Number)
            .as('total_wins') as unknown as SQL<number>,
          totalDraws: sum(tables.draw)
            .mapWith(Number)
            .as('total_draws') as unknown as SQL<number>,
          totalLost: sum(tables.lost)
            .mapWith(Number)
            .as('total_lost') as unknown as SQL<number>,
        })
        .from(tables)
        .leftJoin(series, eq(tables.serieId, series.serieId))
        .where(
          and(
            eq(tables.category, 'regular'),
            eq(series.level, 1.0),
            eq(tables.women, women),
          ),
        )
        .groupBy(tables.teamId)

      const mainTable = db
        .select({
          teamId: teamgames.teamId,
          seasons: countDistinct(teamgames.seasonId).as('seasons'),
          totalGames: count(teamgames.teamGameId).as('total_games'),
          totalPoints: sum(teamgames.points).mapWith(Number).as('total_points'),
          totalGoalsScored: sum(teamgames.goalsScored)
            .mapWith(Number)
            .as('total_goals_scored') as unknown as SQL<number>,
          totalGoalsConceded: sum(teamgames.goalsConceded)
            .mapWith(Number)
            .as('total_goals_conceded') as unknown as SQL<number>,
          totalGoalDifference: sum(teamgames.goalDifference)
            .mapWith(Number)
            .as('total_goal_difference') as unknown as SQL<number>,
          totalWins: sql<number>`cast(count(*) filter (where win) as int)`.as(
            'totalWins',
          ),
          totalDraws: sql<number>`cast(count(*) filter (where draw) as int)`.as(
            'totalDraws',
          ),
          totalLost: sql<number>`cast(count(*) filter (where lost) as int)`.as(
            'totalLost',
          ),
        })
        .from(teamgames)
        .leftJoin(series, eq(series.serieId, teamgames.serieId))
        .where(
          and(
            eq(teamgames.women, women),
            eq(teamgames.category, 'regular'),
            eq(teamgames.played, true),
            eq(series.level, 1.0),
            table === 'home'
              ? eq(teamgames.homeGame, true)
              : table === 'away'
                ? eq(teamgames.homeGame, false)
                : undefined,
          ),
        )
        .groupBy(teamgames.teamId)

      const unionQuery = db
        .$with('union_query')
        .as(unionAll(staticTables, mainTable))

      const result = db.$with('result').as(
        db
          .with(unionQuery)
          .select({
            teamId: unionQuery.teamId,
            seasons: sum(unionQuery.seasons).mapWith(Number).as('seasons'),
            totalGames: sum(unionQuery.totalGames)
              .mapWith(Number)
              .as('total_games'),
            totalPoints: sum(unionQuery.totalPoints)
              .mapWith(Number)
              .as('total_points'),
            totalGoalsScored: sum(unionQuery.totalGoalsScored)
              .mapWith(Number)
              .as('total_goals_scored') as unknown as SQL<number>,
            totalGoalsConceded: sum(unionQuery.totalGoalsConceded)
              .mapWith(Number)
              .as('total_goals_conceded') as unknown as SQL<number>,
            totalGoalDifference: sum(unionQuery.totalGoalDifference)
              .mapWith(Number)
              .as('total_goal_difference') as unknown as SQL<number>,
            totalWins: sum(unionQuery.totalWins)
              .mapWith(Number)
              .as('total_wins'),
            totalDraws: sum(unionQuery.totalDraws)
              .mapWith(Number)
              .as('total_draws'),
            totalLost: sum(unionQuery.totalLost)
              .mapWith(Number)
              .as('total_lost'),
          })
          .from(unionQuery)
          .groupBy(unionQuery.teamId),
      )

      const maratonTables = await db
        .with(result)
        .select({
          teamId: result.teamId,
          seasons: result.seasons,
          totalGames: result.totalGames,
          totalWins: result.totalWins,
          totalDraws: result.totalDraws,
          totalLost: result.totalLost,
          totalGoalsScored: result.totalGoalsScored,
          totalGoalsConceded: result.totalGoalsConceded,
          totalGoalDifference: result.totalGoalDifference,
          totalPoints: result.totalPoints,
          team: {
            teamId: teams.teamId,
            name: teams.name,
            casualName: teams.casualName,
            shortName: teams.shortName,
          } as unknown as SQL<{
            teamId: number
            name: string
            casualName: string
            shortName: string
          }>,
        })
        .from(result)
        .leftJoin(teams, eq(teams.teamId, result.teamId))
        .orderBy(
          desc(result.totalPoints),
          desc(result.totalGoalDifference),
          desc(result.totalGoalsScored),
          asc(result.seasons),
        )

      const breadCrumb = `${table === 'all' ? 'Alla matcher' : table === 'home' ? 'Hemmamatcher' : 'Bortamatcher'} ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Maratontabell ${table === 'all' ? 'Alla' : table === 'home' ? 'Hemmamatcher' : 'Bortamatcher'} ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/table/${table}?women=${women}`

      const meta = {
        title,
        url,
      }
      return { status: 200, tables: maratonTables, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
