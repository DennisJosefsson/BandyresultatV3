import { db } from '@/db'

import {
  games,
  parentchildseries,
  seasons,
  series,
  tables,
  teamgames,
  teams,
  teamseries,
} from '@/db/schema'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
  sum,
} from 'drizzle-orm'
import { alias, unionAll } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export async function cupGames({
  competitionId,
  played,
}: {
  competitionId: number
  played: boolean
}) {
  const playedGamesArray = await db
    .select({
      ...getTableColumns(games),
      home: {
        teamId: home.teamId,
        name: home.name,
        casualName: home.casualName,
        shortName: home.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        casualName: away.casualName,
        shortName: away.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
      serie: {
        serieId: series.serieId,
        serieName: series.serieName,
      } as unknown as SQL<{
        serieId: number
        serieName: string
      }>,
    })
    .from(games)
    .leftJoin(seasons, eq(seasons.seasonId, games.seasonId))
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .leftJoin(series, eq(games.serieId, series.serieId))
    .where(
      and(
        eq(games.played, played),
        eq(series.competitionId, competitionId),
      ),
    )
    .orderBy(
      played ? desc(games.date) : asc(games.date),
      sql`case 
      when ${games.category} like '%final' then 1
      when ${games.category} like '%bronze' then 2
      when ${games.category} like '%semi' then 3
      when ${games.category} like '%playoffseries' then 4
      when ${games.category} like '%quarter' then 5
      when ${games.category} like '%eight' then 6
      when ${games.category} like '%regular' then 7
      when ${games.category} like '%qualification' then 8
    end`,
      asc(games.group),
      asc(sql`home.casual_name collate "se-SE-x-icu"`),
    )

  return playedGamesArray
}

export async function unplayedCupGames({
  serieId,
}: {
  serieId: number
}) {
  const unplayedGamesArray = await db
    .select({
      ...getTableColumns(games),
      home: {
        teamId: home.teamId,
        name: home.name,
        casualName: home.casualName,
        shortName: home.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        casualName: away.casualName,
        shortName: away.shortName,
      } as unknown as SQL<{
        teamId: number
        name: string
        casualName: string
        shortName: string
      }>,
    })
    .from(games)
    .leftJoin(seasons, eq(seasons.seasonId, games.seasonId))
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(
      and(
        eq(games.played, false),
        eq(games.serieId, serieId),
      ),
    )
    .orderBy(asc(games.date))

  return unplayedGamesArray
}

type FunctionProps = {
  serie: typeof series.$inferSelect
  teamArray: Array<number>
}

export const getUnionedTables = async ({
  serie,
  teamArray,
}: FunctionProps) => {
  if (serie.hasStatic) {
    const result = await db
      .select({
        teamId: tables.teamId,
        group: tables.group,
        totalGames: tables.games,
        totalWins: tables.won,
        totalDraws: tables.draw,
        totalLost: tables.lost,
        totalGoalsScored: tables.scoredGoals,
        totalGoalsConceded: tables.concededGoals,
        totalGoalDifference: tables.goalDifference,
        totalPoints: tables.points,
        team: {
          teamId: teams.teamId,
          name: teams.name,
          shortName: teams.shortName,
          casualName: teams.casualName,
        } as unknown as SQL<{
          teamId: number
          name: string
          shortName: string
          casualName: string
        }>,
      })
      .from(tables)
      .leftJoin(teams, eq(tables.teamId, teams.teamId))
      .where(eq(tables.serieId, serie.serieId))
      .orderBy(asc(tables.position))

    return result
  }

  const startTable = db
    .selectDistinctOn([teamgames.teamId], {
      teamId: teamgames.teamId,
      totalGames: sql`0`.mapWith(Number).as('total_games'),
      totalPoints:
        sql<number>`case when teamseries.bonus_points is null then 0 else teamseries.bonus_points end`
          .mapWith(Number)
          .as('total_points'),

      totalGoalsScored: sql`0`
        .mapWith(Number)
        .as('total_goals_scored'),
      totalGoalsConceded: sql`0`
        .mapWith(Number)
        .as('total_goals_conceded'),
      totalGoalDifference: sql`0`
        .mapWith(Number)
        .as('total_goal_difference'),
      totalWins: sql`0`.mapWith(Number).as('total_wins'),
      totalDraws: sql`0`.mapWith(Number).as('total_draws'),
      totalLost: sql`0`.mapWith(Number).as('total_lost'),
    })
    .from(teamgames)
    .leftJoin(
      teamseries,
      and(
        eq(teamgames.teamId, teamseries.teamId),
        eq(teamgames.serieId, teamseries.serieId),
      ),
    )
    .where(
      and(
        inArray(teamgames.teamId, teamArray),
        eq(teamgames.serieId, serie.serieId),
      ),
    )

  const parentSerie = serie.hasParent
    ? db
        .select({
          teamId: teamgames.teamId,
          totalGames: count(teamgames.teamGameId).as(
            'total_games',
          ),
          totalPoints: sum(teamgames.points)
            .mapWith(Number)
            .as('total_points'),
          totalGoalsScored: sum(teamgames.goalsScored)
            .mapWith(Number)
            .as(
              'total_goals_scored',
            ) as unknown as SQL<number>,
          totalGoalsConceded: sum(teamgames.goalsConceded)
            .mapWith(Number)
            .as(
              'total_goals_conceded',
            ) as unknown as SQL<number>,
          totalGoalDifference: sum(teamgames.goalDifference)
            .mapWith(Number)
            .as(
              'total_goal_difference',
            ) as unknown as SQL<number>,
          totalWins:
            sql<number>`cast(count(*) filter (where win) as int)`.as(
              'totalWins',
            ),
          totalDraws:
            sql<number>`cast(count(*) filter (where draw) as int)`.as(
              'totalDraws',
            ),
          totalLost:
            sql<number>`cast(count(*) filter (where lost) as int)`.as(
              'totalLost',
            ),
        })
        .from(teamgames)
        .where(
          and(
            inArray(teamgames.teamId, teamArray),
            serie.allParentGames
              ? undefined
              : inArray(teamgames.opponentId, teamArray),
            inArray(
              teamgames.serieId,
              db
                .select({
                  parentId: parentchildseries.parentId,
                })
                .from(parentchildseries)
                .where(
                  eq(
                    parentchildseries.childId,
                    serie.serieId,
                  ),
                ),
            ),
            eq(teamgames.played, true),
          ),
        )
        .groupBy(teamgames.teamId)
    : undefined

  const mainSerie = db
    .select({
      teamId: teamgames.teamId,
      totalGames: count(teamgames.teamGameId).as(
        'total_games',
      ),
      totalPoints: sum(teamgames.points)
        .mapWith(Number)
        .as('total_points'),
      totalGoalsScored: sum(teamgames.goalsScored)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded)
        .mapWith(Number)
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(teamgames.goalDifference)
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins:
        sql<number>`cast(count(*) filter (where win) as int)`.as(
          'totalWins',
        ),
      totalDraws:
        sql<number>`cast(count(*) filter (where draw) as int)`.as(
          'totalDraws',
        ),
      totalLost:
        sql<number>`cast(count(*) filter (where lost) as int)`.as(
          'totalLost',
        ),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(teamgames.teamId)

  const mixSerie = db
    .select({
      teamId: teamgames.teamId,
      totalGames: count(teamgames.teamGameId).as(
        'total_games',
      ),
      totalPoints: sum(teamgames.points)
        .mapWith(Number)
        .as('total_points'),
      totalGoalsScored: sum(teamgames.goalsScored)
        .mapWith(Number)
        .as('total_goals_scored') as unknown as SQL<number>,
      totalGoalsConceded: sum(teamgames.goalsConceded)
        .mapWith(Number)
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(teamgames.goalDifference)
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins:
        sql<number>`cast(count(*) filter (where win) as int)`.as(
          'totalWins',
        ),
      totalDraws:
        sql<number>`cast(count(*) filter (where draw) as int)`.as(
          'totalDraws',
        ),
      totalLost:
        sql<number>`cast(count(*) filter (where lost) as int)`.as(
          'totalLost',
        ),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.group, 'mix'),
        eq(teamgames.seasonId, serie.seasonId),
        eq(teamgames.played, true),
        inArray(teamgames.teamId, teamArray),
      ),
    )
    .groupBy(teamgames.teamId)

  const unionQuery = parentSerie
    ? db
        .$with('union_query')
        .as(
          unionAll(
            startTable,
            parentSerie,
            mainSerie,
            mixSerie,
          ),
        )
    : db
        .$with('union_query')
        .as(unionAll(startTable, mainSerie, mixSerie))

  const result = await db
    .with(unionQuery)
    .select({
      teamId: unionQuery.teamId,
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
        .as(
          'total_goals_conceded',
        ) as unknown as SQL<number>,
      totalGoalDifference: sum(
        unionQuery.totalGoalDifference,
      )
        .mapWith(Number)
        .as(
          'total_goal_difference',
        ) as unknown as SQL<number>,
      totalWins: sum(unionQuery.totalWins)
        .mapWith(Number)
        .as('total_wins'),
      totalDraws: sum(unionQuery.totalDraws)
        .mapWith(Number)
        .as('total_draws'),
      totalLost: sum(unionQuery.totalLost)
        .mapWith(Number)
        .as('total_lost'),
      team: {
        teamId: teams.teamId,
        name: teams.name,
        shortName: teams.shortName,
        casualName: teams.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(unionQuery)
    .leftJoin(teams, eq(unionQuery.teamId, teams.teamId))
    .groupBy(
      unionQuery.teamId,
      teams.teamId,
      teams.name,
      teams.shortName,
      teams.casualName,
    )
    .orderBy(
      desc(sql`total_points`),
      desc(sql`total_goal_difference`),
      desc(sql`total_goals_scored`),
      asc(sql`casual_name collate "se-SE-x-icu"`),
    )

  return result
}
