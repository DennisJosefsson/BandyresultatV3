import { db } from '@/db'
import type { competitions } from '@/db/schema'
import {
  games,
  series,
  teamgames,
  teams,
} from '@/db/schema'
import type {
  PlayoffGroups,
  PlayoffTable,
} from '@/lib/types/table'
import { sortOrder } from '@/lib/utils/constants'
import type { SQL } from 'drizzle-orm'
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type FunctionProps = {
  serieArray: Array<typeof series.$inferSelect>
  competition: typeof competitions.$inferSelect
}

export const getCupPlayoffTableData = async ({
  serieArray,
  competition,
}: FunctionProps) => {
  const playoffGroups = serieArray.filter((s1) =>
    ['cup-eight', 'cup-quarter', 'cup-semi'].includes(
      s1.category,
    ),
  )

  const serieIds = playoffGroups.map((s2) => s2.serieId)

  const playoffCte = db.$with('playoff_cte').as(
    db
      .select({
        teamId: teamgames.teamId,
        group: teamgames.group,
        category: teamgames.category,
        serieId: teamgames.serieId,
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
          sql<number>`cast(count(*) filter (where win or ot_win) as int)`.as(
            'totalWins',
          ),
        totalDraws:
          sql<number>`cast(count(*) filter (where draw) as int)`.as(
            'totalDraws',
          ),
        totalLost:
          sql<number>`cast(count(*) filter (where lost or ot_lost) as int)`.as(
            'totalLost',
          ),
        awayGoals:
          sql<number>`sum(case when teamgames.home_game = false then teamgames.goals_scored else null end)`
            .mapWith(Number)
            .as('away_goals'),
      })
      .from(teamgames)
      .leftJoin(
        series,
        eq(teamgames.serieId, series.serieId),
      )
      .where(inArray(teamgames.serieId, serieIds))
      .groupBy(
        teamgames.group,
        teamgames.teamId,
        teamgames.category,
        teamgames.serieId,
      ),
  )

  const playoffTables = await db
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
    .leftJoin(
      series,
      eq(series.serieId, playoffCte.serieId),
    )
    .then((res) =>
      sortPlayoffTables({
        tableArray: res,
        uefaSorting: false,
      }),
    )
    .then((res) => {
      const array: Array<PlayoffGroups> = []
      playoffGroups.forEach((group) => {
        const table = res.find(
          (grp) => grp.group === group.group,
        )
        array.push({
          name: group.serieName,
          group: group.group,
          category: group.category,
          table,
        })
      })
      return array
    })
    .then((res) => sortCategories({ sortedTables: res }))

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
    .leftJoin(series, eq(games.serieId, series.serieId))
    .where(
      and(
        eq(series.competitionId, competition.competitionId),
        eq(games.group, 'cup-final'),
      ),
    )
    .orderBy(desc(games.date))

  const bronzeGames = await db
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
    .leftJoin(series, eq(games.serieId, series.serieId))
    .where(
      and(
        eq(series.competitionId, competition.competitionId),
        eq(games.group, 'cup-bronze'),
      ),
    )
    .orderBy(desc(games.date))

  const playoffSeriesTables = serieArray.some(
    (s3) => s3.category === 'cup-playoffseries',
  )
    ? await getPlayoffAsSeriesTable(
        competition.competitionId,
      )
    : undefined

  return {
    finalGames,
    bronzeGames,
    playoffTables,
    playoffSeriesTables,
  }
}

type SortPlayoffTables = {
  tableArray: Array<PlayoffTable>
  uefaSorting: boolean | null
}

type SortedTableGroups = {
  [key: string]: {
    table: Array<PlayoffTable>
    category: string
  }
}

type SortedCategories = {
  [key: string]: Array<PlayoffGroups>
}

const eightGroupIds = ['E1', 'E2', 'E3', 'E4']

function sortPlayoffTables({
  tableArray,
  uefaSorting,
}: SortPlayoffTables) {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = {
        table: [],
        category: table.category,
      }
    }

    groups[table.group].table.push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray)
    .map((group) => {
      return {
        group,
        tables: groupArray[group],
      }
    })
    .sort((a, b) => {
      if (
        sortOrder.indexOf(a.group) >
        sortOrder.indexOf(b.group)
      ) {
        return 1
      } else if (
        sortOrder.indexOf(a.group) <
        sortOrder.indexOf(b.group)
      ) {
        return -1
      } else {
        return 0
      }
    })
    .map((grp) => {
      const sortTables =
        eightGroupIds.includes(grp.group) && uefaSorting
          ? grp.tables.table.sort((a, b) => {
              if (a.totalPoints === b.totalPoints) {
                if (a.awayGoals === b.awayGoals) {
                  return (
                    b.totalGoalsScored - a.totalGoalsScored
                  )
                }
                return b.awayGoals - a.awayGoals
              }
              return b.totalPoints - a.totalPoints
            })
          : grp.tables.table.sort((a, b) => {
              if (a.totalPoints === b.totalPoints) {
                if (
                  b.totalGoalDifference ===
                  a.totalGoalDifference
                ) {
                  return (
                    b.totalGoalsScored - a.totalGoalsScored
                  )
                }
                return (
                  b.totalGoalDifference -
                  a.totalGoalDifference
                )
              }
              return b.totalPoints - a.totalPoints
            })

      return {
        category: grp.tables.category,
        group: grp.group,
        result: `${sortTables[0].totalWins}-${sortTables[1].totalWins}`,
        homeTeam: sortTables[0].team,
        awayTeam: sortTables[1].team,
        tables: sortTables,
      }
    })

  return sortedTables
}

const sortCategories = ({
  sortedTables,
}: {
  sortedTables: Array<PlayoffGroups>
}) => {
  const categoryArray = sortedTables.reduce(
    (category, group) => {
      if (!category[group.category]) {
        category[group.category] = []
      }
      category[group.category].push(group)
      return category
    },
    {} as SortedCategories,
  )

  const sortedCategories = Object.keys(categoryArray).map(
    (c) => {
      return {
        category: c,
        groups: categoryArray[c],
      }
    },
  )

  return sortedCategories.sort((a, b) => {
    if (
      sortOrder.indexOf(a.category) >
      sortOrder.indexOf(b.category)
    ) {
      return 1
    } else if (
      sortOrder.indexOf(a.category) <
      sortOrder.indexOf(b.category)
    ) {
      return -1
    } else {
      return 0
    }
  })
}

async function getPlayoffAsSeriesTable(
  competitionId: number,
) {
  const playoffCte = db.$with('playoff_cte').as(
    db
      .select({
        teamId: teamgames.teamId,
        group: teamgames.group,
        category: teamgames.category,
        serieId: teamgames.serieId,
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
        awayGoals:
          sql<number>`sum(case when teamgames.home_game = false then teamgames.goals_scored else null end)`
            .mapWith(Number)
            .as('away_goals'),
      })
      .from(teamgames)
      .leftJoin(
        series,
        eq(teamgames.serieId, series.serieId),
      )
      .where(
        and(
          eq(series.competitionId, competitionId),
          inArray(teamgames.category, ['playoffseries']),
        ),
      )
      .groupBy(
        teamgames.group,
        teamgames.teamId,
        teamgames.category,
        teamgames.serieId,
      ),
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
      serie: {
        level: series.level,
        serieName: series.serieName,
      } as unknown as SQL<{
        level: number
        serieName: string
      }>,
    })
    .from(playoffCte)
    .leftJoin(teams, eq(teams.teamId, playoffCte.teamId))
    .leftJoin(
      series,
      eq(series.serieId, playoffCte.serieId),
    )

  const seriesData = await db
    .select()
    .from(series)
    .where(
      and(
        eq(series.competitionId, competitionId),
        eq(series.category, 'cup-playoffseries'),
      ),
    )

  const sortedTables = sortPlayoffTables({
    tableArray: table,
    uefaSorting: false,
  }).map((group) => {
    const seriesObject = seriesData.find(
      (serie) => serie.group === group.group,
    )
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
