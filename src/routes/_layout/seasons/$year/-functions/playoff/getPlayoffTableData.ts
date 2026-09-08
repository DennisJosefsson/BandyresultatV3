import { db } from '@/db'
import {
  competitions,
  games,
  seasons,
  series,
  teamgames,
  teams,
  teamseries,
} from '@/db/schema'
import type {
  GoalsArrayItem,
  PlayoffGroupsV2,
  PlayoffTable,
  TeamArrayItem,
} from '@/lib/types/table'
import { sortOrder } from '@/lib/utils/constants'
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
import { alias } from 'drizzle-orm/pg-core'

type FunctionProps = {
  year: number
  women: boolean
}

export const getPlayoffTableData = async ({
  year,
  women,
}: FunctionProps) => {
  // const playoffGroups = await db
  //   .select()
  //   .from(series)
  //   .where(
  //     and(
  //       eq(series.seasonId, playoffSeason.seasonId),
  //       inArray(series.category, [
  //         'eight',
  //         'quarter',
  //         'semi',
  //       ]),
  //     ),
  //   )
  //   .then((res) =>
  //     res.sort((a, b) => {
  //       if (
  //         sortOrder.indexOf(a.group) >
  //         sortOrder.indexOf(b.group)
  //       ) {
  //         return 1
  //       } else if (
  //         sortOrder.indexOf(a.group) <
  //         sortOrder.indexOf(b.group)
  //       ) {
  //         return -1
  //       } else {
  //         return 0
  //       }
  //     }),
  //   )

  // const playoffCte = db.$with('playoff_cte').as(
  //   db
  //     .select({
  //       teamId: teamgames.teamId,
  //       group: series.group as unknown as SQL<string>,
  //       category: series.category as unknown as SQL<string>,
  //       serieId: teamgames.serieId,
  //       totalGames: count(teamgames.teamGameId).as(
  //         'total_games',
  //       ),
  //       totalPoints: sum(teamgames.points)
  //         .mapWith(Number)
  //         .as('total_points'),
  //       totalGoalsScored: sum(teamgames.goalsScored)
  //         .mapWith(Number)
  //         .as(
  //           'total_goals_scored',
  //         ) as unknown as SQL<number>,
  //       totalGoalsConceded: sum(teamgames.goalsConceded)
  //         .mapWith(Number)
  //         .as(
  //           'total_goals_conceded',
  //         ) as unknown as SQL<number>,
  //       totalGoalDifference: sum(teamgames.goalDifference)
  //         .mapWith(Number)
  //         .as(
  //           'total_goal_difference',
  //         ) as unknown as SQL<number>,
  //       totalWins:
  //         sql<number>`cast(count(*) filter (where win or ot_win) as int)`.as(
  //           'totalWins',
  //         ),
  //       totalDraws:
  //         sql<number>`cast(count(*) filter (where draw) as int)`.as(
  //           'totalDraws',
  //         ),
  //       totalLost:
  //         sql<number>`cast(count(*) filter (where lost or ot_lost) as int)`.as(
  //           'totalLost',
  //         ),
  //       awayGoals:
  //         sql<number>`sum(case when teamgames.home_game = false then teamgames.goals_scored else null end)`
  //           .mapWith(Number)
  //           .as('away_goals'),
  //     })
  //     .from(teamgames)
  //     .leftJoin(
  //       series,
  //       eq(teamgames.serieId, series.serieId),
  //     )
  //     .where(
  //       and(
  //         eq(teamgames.seasonId, playoffSeason.seasonId),
  //         inArray(series.category, [
  //           'eight',
  //           'quarter',
  //           'semi',
  //         ]),
  //       ),
  //     )
  //     .groupBy(
  //       series.group,
  //       teamgames.teamId,
  //       series.category,
  //       teamgames.serieId,
  //     ),
  // )

  // const playoffTables = await db
  //   .with(playoffCte)
  //   .select({
  //     teamId: playoffCte.teamId,
  //     group: playoffCte.group,
  //     category: playoffCte.category,
  //     totalGames: playoffCte.totalGames,
  //     totalWins: playoffCte.totalWins,
  //     totalDraws: playoffCte.totalDraws,
  //     totalLost: playoffCte.totalLost,
  //     totalGoalsScored: playoffCte.totalGoalsScored,
  //     totalGoalsConceded: playoffCte.totalGoalsConceded,
  //     totalGoalDifference: playoffCte.totalGoalDifference,
  //     totalPoints: playoffCte.totalPoints,
  //     awayGoals: playoffCte.awayGoals,
  //     team: {
  //       teamId: teams.teamId,
  //       name: teams.name,
  //       shortName: teams.shortName,
  //       casualName: teams.casualName,
  //     } as unknown as SQL<{
  //       teamId: number
  //       name: string
  //       shortName: string
  //       casualName: string
  //     }>,
  //   })
  //   .from(playoffCte)
  //   .leftJoin(teams, eq(teams.teamId, playoffCte.teamId))
  //   .leftJoin(
  //     series,
  //     eq(series.serieId, playoffCte.serieId),
  //   )
  //   .then((res) =>
  //     sortPlayoffTables({
  //       tableArray: res,
  //       uefaSorting: playoffSeason.uefaSorting,
  //     }),
  //   )
  //   .then((res) => {
  //     const array: Array<PlayoffGroups> = []
  //     playoffGroups.forEach((group) => {
  //       const table = res.find(
  //         (grp) => grp.group === group.group,
  //       )
  //       array.push({
  //         name: group.serieName,
  //         group: group.group,
  //         category: group.category,
  //         table,
  //       })
  //     })
  //     return array
  //   })
  //   .then((res) => sortCategories({ sortedTables: res }))

  const playoffTables = await getPlayoffTable({
    year,
    women,
  })

  const home = alias(teams, 'home')
  const away = alias(teams, 'away')

  const finalGames = await db
    .select({
      ...getTableColumns(games),
      group: series.group as unknown as SQL<string>,
      category: series.category as unknown as SQL<string>,
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
    .leftJoin(series, eq(series.serieId, games.serieId))
    .where(
      and(
        inArray(
          games.seasonId,
          db
            .select({ seasonId: seasons.seasonId })
            .from(seasons)
            .where(
              and(
                eq(seasons.intYear, year),
                eq(seasons.women, women),
              ),
            ),
        ),
        eq(series.group, 'final'),
      ),
    )
    .orderBy(desc(games.date))

  const bronzeGames = await db
    .select({
      ...getTableColumns(games),
      group: series.group as unknown as SQL<string>,
      category: series.category as unknown as SQL<string>,
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
        inArray(
          games.seasonId,
          db
            .select({ seasonId: seasons.seasonId })
            .from(seasons)
            .where(
              and(
                eq(seasons.intYear, year),
                eq(seasons.women, women),
              ),
            ),
        ),
        eq(series.group, 'bronze'),
      ),
    )
    .orderBy(desc(games.date))

  const getPayoffSeriesTables =
    await getPlayoffAsSeriesTable({ year, women })

  return {
    finalGames,
    bronzeGames,
    playoffTables,
    playoffSeriesTables:
      getPayoffSeriesTables.length === 0
        ? undefined
        : getPayoffSeriesTables,
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

// type SortedCategories = {
//   [key: string]: Array<PlayoffGroups>
// }

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

// const sortCategories = ({
//   sortedTables,
// }: {
//   sortedTables: Array<PlayoffGroups>
// }) => {
//   const categoryArray = sortedTables.reduce(
//     (category, group) => {
//       if (!category[group.category]) {
//         category[group.category] = []
//       }
//       category[group.category].push(group)
//       return category
//     },
//     {} as SortedCategories,
//   )

//   const sortedCategories = Object.keys(categoryArray).map(
//     (c) => {
//       return {
//         category: c,
//         groups: categoryArray[c],
//       }
//     },
//   )

//   return sortedCategories.sort((a, b) => {
//     if (
//       sortOrder.indexOf(a.category) >
//       sortOrder.indexOf(b.category)
//     ) {
//       return 1
//     } else if (
//       sortOrder.indexOf(a.category) <
//       sortOrder.indexOf(b.category)
//     ) {
//       return -1
//     } else {
//       return 0
//     }
//   })
// }

async function getPlayoffAsSeriesTable({
  year,
  women,
}: {
  year: number
  women: boolean
}) {
  const playoffCte = db.$with('playoff_cte').as(
    db
      .select({
        teamId: teamgames.teamId,
        group: series.group as unknown as SQL<string>,
        category: series.category as unknown as SQL<string>,
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
        eq(series.serieId, teamgames.serieId),
      )
      .where(
        and(
          inArray(
            teamgames.seasonId,
            db
              .select({ seasonId: seasons.seasonId })
              .from(seasons)
              .where(
                and(
                  eq(seasons.intYear, year),
                  eq(seasons.women, women),
                ),
              ),
          ),
          inArray(series.category, ['playoffseries']),
        ),
      )
      .groupBy(
        series.group,
        teamgames.teamId,
        series.category,
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
        inArray(
          series.seasonId,
          db
            .select({ seasonId: seasons.seasonId })
            .from(seasons)
            .where(
              and(
                eq(seasons.intYear, year),
                eq(seasons.women, women),
              ),
            ),
        ),
        eq(series.category, 'playoffseries'),
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

async function getPlayoffTable({
  year,
  women,
}: {
  year: number
  women: boolean
}) {
  const seriesCte = db.$with('series_cte').as(
    db
      .select({
        serieId: series.serieId,
        teamId: teamgames.teamId,
        gameCount: count(teamgames.teamGameId).as(
          'game_count',
        ),
        goalsArray: sql<Array<GoalsArrayItem>>`
                  coalesce(
                      json_agg(
                          json_build_object(
                          'otWin',teamgames.ot_win,
                          'penalties',games.penalties,
                          'extraTime',games.extra_time,
                          'goals',coalesce(teamgames.ot_goals_scored, teamgames.goals_scored, 0)
                          )
                      order by teamgames."date" asc
                      ) filter (where teamgames.played is true), '[]'::json
                  ) 
                  `.as('goals_array'),
        awayGoals:
          sql`coalesce(sum(case when teamgames.home_game is false then teamgames.goals_scored else 0 end),0)`
            .mapWith(Number)
            .as('away_goals'),
        winCount:
          sql`coalesce(sum(case when coalesce(teamgames.ot_win,teamgames.win) is true then 1 else 0 end),0)`
            .mapWith(Number)
            .as('win_count'),
      })
      .from(series)
      .leftJoin(
        seasons,
        eq(seasons.seasonId, series.seasonId),
      )
      .leftJoin(
        teamgames,
        eq(teamgames.serieId, series.serieId),
      )
      .leftJoin(games, eq(games.gameId, teamgames.gameId))
      .leftJoin(
        competitions,
        eq(
          competitions.competitionId,
          series.competitionId,
        ),
      )
      .where(
        and(
          eq(seasons.intYear, year),
          eq(seasons.women, women),
          inArray(series.category, [
            'semi',
            'quarter',
            'eight',
          ]),
        ),
      )
      .groupBy(series.serieId, teamgames.teamId),
  )

  const groupsAgg = db.$with('groups_agg').as(
    db
      .with(seriesCte)
      .select({
        serieId: seriesCte.serieId,
        serieName: series.serieName,
        level: series.level,
        teamArray: sql<Array<TeamArrayItem>>`
                      coalesce(json_agg(
                          json_build_object(
                              'teamId',teams.team_id,
                              'shortName',teams.short_name,
                              'name',teams."name",
                              'casualName',teams.casual_name,
                              'winCount',series_cte.win_count,
                              'gameCount',series_cte.game_count,
                              'awayGoals',series_cte.away_goals,
                              'goalsArray',series_cte.goals_array
                          ) order by teamseries.sort_priority desc, series_cte.win_count desc) 
                      filter (where teams.team_id is not null), '[]'::json )
                  `.as('team_array'),
      })
      .from(seriesCte)
      .leftJoin(
        series,
        eq(series.serieId, seriesCte.serieId),
      )
      .leftJoin(teams, eq(teams.teamId, seriesCte.teamId))
      .leftJoin(
        teamseries,
        and(
          eq(teamseries.serieId, seriesCte.serieId),
          eq(teamseries.teamId, seriesCte.teamId),
        ),
      )
      .groupBy(
        seriesCte.serieId,
        series.serieName,
        series.level,
      )
      .orderBy(asc(series.level), series.serieName),
  )

  const array = await db
    .with(groupsAgg)
    .select({
      category: series.category as unknown as SQL<string>,
      level: groupsAgg.level,
      groupArray: sql<Array<PlayoffGroupsV2>>`
                  json_agg(
                      json_build_object(
                          'group',series.serie_group_code,
                          'serieName',groups_agg.serie_name,
                          'teamArray',groups_agg.team_array
                      ) order by groups_agg.serie_name
                  )
                `.as('group_array'),
    })
    .from(groupsAgg)
    .leftJoin(series, eq(series.serieId, groupsAgg.serieId))
    .groupBy(series.category, groupsAgg.level)
    .orderBy(asc(groupsAgg.level))

  return array
}
