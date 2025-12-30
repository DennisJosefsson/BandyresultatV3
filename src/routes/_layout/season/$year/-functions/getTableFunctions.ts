import { db } from '@/db'
import { series, tables, teamgames, teams, teamseries } from '@/db/schema'
import { and, asc, count, desc, eq, inArray, SQL, sql, sum } from 'drizzle-orm'
import { unionAll } from 'drizzle-orm/pg-core'

type FunctionProps = {
  serie: typeof series.$inferSelect
  table: 'all' | 'home' | 'away'
}

export const getUnionedTables = async ({ serie, table }: FunctionProps) => {
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
          name: teams.name,
          shortName: teams.shortName,
          casualName: teams.casualName,
        } as unknown as SQL<{
          name: string
          shortName: string
          casualName: string
        }>,
      })
      .from(tables)
      .leftJoin(teams, eq(tables.teamId, teams.teamId))
      .where(eq(tables.serieId, serie.serieId))
      .orderBy(asc(tables.position))
    serie.comment = 'Serien har ej tabeller för hemma-/bortamatcher.'
    return result
  }

  const teamArray = await db
    .select({ teamId: teamseries.teamId })
    .from(teamseries)
    .where(eq(teamseries.serieId, serie.serieId))
    .then((res) => res.map((item) => item.teamId))

  const startTable = db
    .selectDistinctOn([teamgames.teamId], {
      teamId: teamgames.teamId,
      totalGames: sql`0`.mapWith(Number).as('total_games'),
      totalPoints:
        table === 'all'
          ? teamseries.bonusPoints
          : sql`0`.mapWith(Number).as('total_points'),
      totalGoalsScored: sql`0`.mapWith(Number).as('total_goals_scored'),
      totalGoalsConceded: sql`0`.mapWith(Number).as('total_goals_conceded'),
      totalGoalDifference: sql`0`.mapWith(Number).as('total_goal_difference'),
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

  const parentSerie = serie.parentSerieId
    ? db
        .select({
          teamId: teamgames.teamId,
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
        .where(
          and(
            inArray(teamgames.teamId, teamArray),
            eq(teamgames.serieId, serie.parentSerieId),
            eq(teamgames.played, true),
            table === 'home'
              ? eq(teamgames.homeGame, true)
              : table === 'away'
                ? eq(teamgames.homeGame, false)
                : undefined,
          ),
        )
        .groupBy(teamgames.teamId)
    : undefined

  const mainSerie = db
    .select({
      teamId: teamgames.teamId,
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
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(teamgames.played, true),
        table === 'home'
          ? eq(teamgames.homeGame, true)
          : table === 'away'
            ? eq(teamgames.homeGame, false)
            : undefined,
      ),
    )
    .groupBy(teamgames.teamId)

  const mixSerie = db
    .select({
      teamId: teamgames.teamId,
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
    .where(
      and(
        eq(teamgames.category, 'mix'),
        eq(teamgames.seasonId, serie.seasonId),
        eq(teamgames.played, true),
        inArray(teamgames.teamId, teamArray),
        table === 'home'
          ? eq(teamgames.homeGame, true)
          : table === 'away'
            ? eq(teamgames.homeGame, false)
            : undefined,
      ),
    )
    .groupBy(teamgames.teamId)

  const unionQuery = parentSerie
    ? db
        .$with('union_query')
        .as(unionAll(startTable, parentSerie, mainSerie, mixSerie))
    : db.$with('union_query').as(unionAll(startTable, mainSerie, mixSerie))

  const result = await db
    .with(unionQuery)
    .select({
      teamId: unionQuery.teamId,
      totalGames: sum(unionQuery.totalGames).mapWith(Number).as('total_games'),
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
      totalWins: sum(unionQuery.totalWins).mapWith(Number).as('total_wins'),
      totalDraws: sum(unionQuery.totalDraws).mapWith(Number).as('total_draws'),
      totalLost: sum(unionQuery.totalLost).mapWith(Number).as('total_lost'),
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
