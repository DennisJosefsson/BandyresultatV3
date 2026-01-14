import { db } from '@/db'
import { games, playoffseason, series, teamgames, teams } from '@/db/schema'
import { PlayoffTable } from '@/lib/types/table'
import { sortOrder } from '@/lib/utils/constants'
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  SQL,
  sql,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type FunctionProps = { playoffSeason: typeof playoffseason.$inferSelect }

export const getPlayoffTableData = async ({ playoffSeason }: FunctionProps) => {
  const playoffCte = db.$with('playoff_cte').as(
    db
      .select({
        teamId: teamgames.teamId,
        group: teamgames.group,
        category: teamgames.category,
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
        awayGoals:
          sql<number>`sum(case when teamgames.home_game = false then teamgames.goals_scored else null end)`
            .mapWith(Number)
            .as('away_goals'),
      })
      .from(teamgames)
      .where(
        and(
          eq(teamgames.seasonId, playoffSeason.seasonId),
          inArray(teamgames.category, ['eight', 'quarter', 'semi']),
        ),
      )
      .groupBy(teamgames.group, teamgames.teamId, teamgames.category),
  )

  const table = await db
    .with(playoffCte)
    .select({
      teamId: playoffCte.teamId,
      group: playoffCte.group,
      category: playoffCte.category,
      totalGames: playoffCte.totalGames,
      totalWins: playoffCte.totalWins,
      totalDraws: playoffCte.totalDraws,
      totalLost: playoffCte.totalLost,
      totalGoalsScored: playoffCte.totalGoalsScored,
      totalGoalsConceded: playoffCte.totalGoalsConceded,
      totalGoalDifference: playoffCte.totalGoalDifference,
      totalPoints: playoffCte.totalPoints,
      awayGoals: playoffCte.awayGoals,
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
    .from(playoffCte)
    .leftJoin(teams, eq(teams.teamId, playoffCte.teamId))

  const playoffTables = sortPlayoffTables({
    tableArray: table,
    uefaSorting: playoffSeason.uefaSorting,
  })

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const finalGames = await db
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
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .where(
      and(eq(games.seasonId, playoffSeason.seasonId), eq(games.group, 'final')),
    )
    .orderBy(desc(games.date))

  const playoffSeriesTable = playoffSeason.playoffAsSeries
    ? await getPlayoffAsSeriesTable(playoffSeason.seasonId)
    : undefined

  const semiTables = playoffTables.filter((tbl) =>
    ['S1', 'S2'].includes(tbl.group),
  )
  const quarterTables = playoffTables.filter((tbl) =>
    ['Q1', 'Q2', 'Q3', 'Q4'].includes(tbl.group),
  )
  const eightTables = playoffTables.filter((tbl) =>
    ['E1', 'E2', 'E3', 'E4'].includes(tbl.group),
  )

  return {
    finalGames: finalGames,
    semiTables: semiTables.length > 0 ? semiTables : undefined,
    quarterTables: quarterTables.length > 0 ? quarterTables : undefined,
    eightTables: eightTables.length > 0 ? eightTables : undefined,
    playoffSeriesTables: playoffSeriesTable,
  }
}

type SortPlayoffTables = {
  tableArray: PlayoffTable[]
  uefaSorting: boolean | null
}

type SortedTableGroups = {
  [key: string]: PlayoffTable[]
}

const eightGroupIds = ['E1', 'E2', 'E3', 'E4']

function sortPlayoffTables({ tableArray, uefaSorting }: SortPlayoffTables) {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    return {
      group,
      tables: groupArray[group],
    }
  })

  return sortedTables
    .sort((a, b) => {
      if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
        return 1
      } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
        return -1
      } else {
        return 0
      }
    })
    .map((grp) => {
      const sortedTables =
        eightGroupIds.includes(grp.group) && uefaSorting
          ? grp.tables.sort((a, b) => {
              if (a.totalPoints === b.totalPoints) {
                if (a.awayGoals === b.awayGoals) {
                  return b.totalGoalsScored - a.totalGoalsScored
                }
                return b.awayGoals - a.awayGoals
              }
              return b.totalPoints - a.totalPoints
            })
          : grp.tables.sort((a, b) => {
              if (a.totalPoints === b.totalPoints) {
                if (b.totalGoalDifference === a.totalGoalDifference) {
                  return b.totalGoalsScored - a.totalGoalsScored
                }
                return b.totalGoalDifference - a.totalGoalDifference
              }
              return b.totalPoints - a.totalPoints
            })

      return {
        group: grp.group,
        result: `${sortedTables[0].totalWins} - ${sortedTables[1].totalWins}`,
        homeTeam: sortedTables[0].team,
        awayTeam: sortedTables[1].team,
        tables: sortedTables,
      }
    })
}

async function getPlayoffAsSeriesTable(seasonId: number) {
  const playoffCte = db.$with('playoff_cte').as(
    db
      .select({
        teamId: teamgames.teamId,
        group: teamgames.group,
        category: teamgames.category,
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
        awayGoals:
          sql<number>`sum(case when teamgames.home_game = false then teamgames.goals_scored else null end)`
            .mapWith(Number)
            .as('away_goals'),
      })
      .from(teamgames)
      .where(
        and(
          eq(teamgames.seasonId, seasonId),
          inArray(teamgames.category, ['playoffseries']),
        ),
      )
      .groupBy(teamgames.group, teamgames.teamId, teamgames.category),
  )

  const table = await db
    .with(playoffCte)
    .select({
      teamId: playoffCte.teamId,
      group: playoffCte.group,
      category: playoffCte.category,
      totalGames: playoffCte.totalGames,
      totalWins: playoffCte.totalWins,
      totalDraws: playoffCte.totalDraws,
      totalLost: playoffCte.totalLost,
      totalGoalsScored: playoffCte.totalGoalsScored,
      totalGoalsConceded: playoffCte.totalGoalsConceded,
      totalGoalDifference: playoffCte.totalGoalDifference,
      totalPoints: playoffCte.totalPoints,
      awayGoals: playoffCte.awayGoals,
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
    .from(playoffCte)
    .leftJoin(teams, eq(teams.teamId, playoffCte.teamId))

  const seriesData = await db
    .select()
    .from(series)
    .where(
      and(eq(series.seasonId, seasonId), eq(series.category, 'playoffseries')),
    )

  const sortedTables = sortPlayoffTables({
    tableArray: table,
    uefaSorting: false,
  }).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group.group)
    if (!seriesObject) {
      throw new Error('Serieobjekt saknas.')
    }
    return {
      group: group.group,
      tables: group.tables,
      comment: seriesObject.comment,
      serieStructure: seriesObject.serieStructure,
      name: seriesObject.serieName,
    }
  })

  return sortedTables
}
