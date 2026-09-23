import { db } from '@/db'
import {
  competitions,
  games,
  seasons,
  series,
  teamgames,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import {
  jsonAggBuildObject,
  jsonBuildObject,
} from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type {
  GoalsArrayItem,
  PlayoffGroupsV3,
  PlayoffTable,
  TeamArrayItemV2,
} from '@/lib/types/table'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import { sortOrder } from '@/lib/utils/constants'
import type { Column, SQL } from 'drizzle-orm'
import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  or,
  sql,
  sum,
} from 'drizzle-orm'
import {
  away,
  awayLogo,
  awayTeamName,
  awayTeamSeason,
  awayTeamSeasonLogo,
  awayTeamSeasonName,
  home,
  homeLogo,
  homeTeamName,
  homeTeamSeason,
  homeTeamSeasonLogo,
  homeTeamSeasonName,
  teamseasonLogo,
  teamseasonName,
} from '../libs/aliases'

type FunctionProps = {
  year: number
  women: boolean
}

export const getPlayoffTableData = async ({
  year,
  women,
}: FunctionProps) => {
  const playoffTables = await getPlayoffTable({
    year,
    women,
  })

  const finalAndBronzeGames = await db
    .select({
      ...getTableColumns(games),
      group: series.group as unknown as SQL<string>,
      category: series.category as unknown as SQL<string>,
      home: {
        teamId: home.teamId,
        name: coalesce(
          homeTeamSeasonName.name,
          homeTeamName.name,
        ),
        casualName: coalesce(
          homeTeamSeasonName.casualName,
          homeTeamName.casualName,
        ),
        shortName: coalesce(
          homeTeamSeasonName.shortName,
          homeTeamName.shortName,
        ),
        logo: {
          logoId: coalesce(
            homeTeamSeasonLogo.logoId,
            homeLogo.logoId,
          ),
          hasDark: coalesce(
            homeTeamSeasonLogo.hasDark,
            homeLogo.hasDark,
          ),
        },
      } as unknown as SQL<TeamBaseWithLogo>,
      away: {
        teamId: away.teamId,
        name: coalesce(
          awayTeamSeasonName.name,
          awayTeamName.name,
        ),
        casualName: coalesce(
          awayTeamSeasonName.casualName,
          awayTeamName.casualName,
        ),
        shortName: coalesce(
          awayTeamSeasonName.shortName,
          awayTeamName.shortName,
        ),
        logo: {
          logoId: coalesce(
            awayTeamSeasonLogo.logoId,
            awayLogo.logoId,
          ),
          hasDark: coalesce(
            awayTeamSeasonLogo.hasDark,
            awayLogo.hasDark,
          ),
        },
      } as unknown as SQL<TeamBaseWithLogo>,
    })
    .from(games)
    .leftJoin(home, eq(games.homeTeamId, home.teamId))
    .leftJoin(away, eq(games.awayTeamId, away.teamId))
    .leftJoin(
      homeTeamSeason,
      and(
        eq(homeTeamSeason.seasonId, games.seasonId),
        eq(homeTeamSeason.teamId, games.homeTeamId),
      ),
    )
    .leftJoin(
      awayTeamSeason,
      and(
        eq(awayTeamSeason.seasonId, games.seasonId),
        eq(awayTeamSeason.teamId, games.awayTeamId),
      ),
    )
    .leftJoin(
      homeTeamName,
      eq(home.teamnameId, homeTeamName.teamnameId),
    )
    .leftJoin(
      awayTeamName,
      eq(away.teamnameId, awayTeamName.teamnameId),
    )
    .leftJoin(
      homeTeamSeasonName,
      eq(
        homeTeamSeason.teamnameId,
        homeTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      awayTeamSeasonName,
      eq(
        awayTeamSeason.teamnameId,
        awayTeamSeasonName.teamnameId,
      ),
    )
    .leftJoin(
      homeLogo,
      eq(homeTeamName.logoId, homeLogo.logoId),
    )
    .leftJoin(
      awayLogo,
      eq(awayTeamName.logoId, awayLogo.logoId),
    )
    .leftJoin(
      homeTeamSeasonLogo,
      eq(
        homeTeamSeasonName.logoId,
        homeTeamSeasonLogo.logoId,
      ),
    )
    .leftJoin(
      awayTeamSeasonLogo,
      eq(
        awayTeamSeasonName.logoId,
        awayTeamSeasonLogo.logoId,
      ),
    )
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
        or(
          eq(series.group, 'final'),
          eq(series.group, 'bronze'),
        ),
      ),
    )
    .orderBy(desc(games.date))

  // const bronzeGames = await db
  //   .select({
  //     ...getTableColumns(games),
  //     group: series.group as unknown as SQL<string>,
  //     category: series.category as unknown as SQL<string>,
  //     home: {
  //       teamId: home.teamId,
  //       name: coalesce(
  //         homeTeamSeasonName.name,
  //         homeTeamName.name,
  //       ),
  //       casualName: coalesce(
  //         homeTeamSeasonName.casualName,
  //         homeTeamName.casualName,
  //       ),
  //       shortName: coalesce(
  //         homeTeamSeasonName.shortName,
  //         homeTeamName.shortName,
  //       ),
  //       logo: {
  //         logoId: coalesce(
  //           homeTeamSeasonLogo.logoId,
  //           homeLogo.logoId,
  //         ),
  //         hasDark: coalesce(
  //           homeTeamSeasonLogo.hasDark,
  //           homeLogo.hasDark,
  //         ),
  //       },
  //     } as unknown as SQL<TeamBaseWithLogo>,
  //     away: {
  //       teamId: away.teamId,
  //       name: coalesce(
  //         awayTeamSeasonName.name,
  //         awayTeamName.name,
  //       ),
  //       casualName: coalesce(
  //         awayTeamSeasonName.casualName,
  //         awayTeamName.casualName,
  //       ),
  //       shortName: coalesce(
  //         awayTeamSeasonName.shortName,
  //         awayTeamName.shortName,
  //       ),
  //       logo: {
  //         logoId: coalesce(
  //           awayTeamSeasonLogo.logoId,
  //           awayLogo.logoId,
  //         ),
  //         hasDark: coalesce(
  //           awayTeamSeasonLogo.hasDark,
  //           awayLogo.hasDark,
  //         ),
  //       },
  //     } as unknown as SQL<TeamBaseWithLogo>,
  //   })
  //   .from(games)
  //   .leftJoin(home, eq(games.homeTeamId, home.teamId))
  //   .leftJoin(away, eq(games.awayTeamId, away.teamId))
  //   .leftJoin(
  //     homeTeamSeason,
  //     and(
  //       eq(homeTeamSeason.seasonId, seasons.seasonId),
  //       eq(homeTeamSeason.teamId, games.homeTeamId),
  //     ),
  //   )
  //   .leftJoin(
  //     awayTeamSeason,
  //     and(
  //       eq(awayTeamSeason.seasonId, seasons.seasonId),
  //       eq(awayTeamSeason.teamId, games.awayTeamId),
  //     ),
  //   )
  //   .leftJoin(
  //     homeTeamName,
  //     eq(home.teamnameId, homeTeamName.teamnameId),
  //   )
  //   .leftJoin(
  //     awayTeamName,
  //     eq(away.teamnameId, awayTeamName.teamnameId),
  //   )
  //   .leftJoin(
  //     homeTeamSeasonName,
  //     eq(
  //       homeTeamSeason.teamnameId,
  //       homeTeamSeasonName.teamnameId,
  //     ),
  //   )
  //   .leftJoin(
  //     awayTeamSeasonName,
  //     eq(
  //       awayTeamSeason.teamnameId,
  //       awayTeamSeasonName.teamnameId,
  //     ),
  //   )
  //   .leftJoin(
  //     homeLogo,
  //     eq(homeTeamName.logoId, homeLogo.logoId),
  //   )
  //   .leftJoin(
  //     awayLogo,
  //     eq(awayTeamName.logoId, awayLogo.logoId),
  //   )
  //   .leftJoin(
  //     homeTeamSeasonLogo,
  //     eq(
  //       homeTeamSeasonName.logoId,
  //       homeTeamSeasonLogo.logoId,
  //     ),
  //   )
  //   .leftJoin(
  //     awayTeamSeasonLogo,
  //     eq(
  //       awayTeamSeasonName.logoId,
  //       awayTeamSeasonLogo.logoId,
  //     ),
  //   )
  //   .leftJoin(series, eq(games.serieId, series.serieId))
  //   .where(
  //     and(
  //       inArray(
  //         games.seasonId,
  //         db
  //           .select({ seasonId: seasons.seasonId })
  //           .from(seasons)
  //           .where(
  //             and(
  //               eq(seasons.intYear, year),
  //               eq(seasons.women, women),
  //             ),
  //           ),
  //       ),
  //       eq(series.group, 'bronze'),
  //     ),
  //   )
  //   .orderBy(desc(games.date))

  const getPlayoffSeriesTables =
    await getPlayoffAsSeriesTable({ year, women })

  return {
    finalGames: finalAndBronzeGames.filter(
      (g) => g.group === 'final',
    ),
    bronzeGames: finalAndBronzeGames.filter(
      (g) => g.group === 'bronze',
    ),
    playoffTables,
    playoffSeriesTables:
      getPlayoffSeriesTables.length === 0
        ? undefined
        : getPlayoffSeriesTables,
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
        seasonId: teamgames.seasonId,
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
        teamgames.seasonId,
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
        name: coalesce(teamseasonName.name, teamnames.name),
        shortName: coalesce(
          teamseasonName.shortName,
          teamnames.shortName,
        ),
        casualName: coalesce(
          teamseasonName.casualName,
          teamnames.casualName,
        ),
        logo: {
          logoId: coalesce(
            teamseasonLogo.logoId,
            teamlogos.logoId,
          ),
          hasDark: coalesce(
            teamseasonLogo.hasDark,
            teamlogos.hasDark,
          ),
        },
      } as unknown as SQL<TeamBaseWithLogo>,
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
      teamseasons,
      and(
        eq(teamseasons.teamId, teams.teamId),
        eq(teamseasons.seasonId, playoffCte.seasonId),
      ),
    )
    .leftJoin(
      teamnames,
      eq(teamnames.teamnameId, teams.teamnameId),
    )
    .leftJoin(
      teamseasonName,
      eq(teamseasons.teamnameId, teamseasonName.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      teamseasonLogo,
      eq(teamseasonLogo.logoId, teamseasonName.logoId),
    )
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
  const seriesCteWithHelper = db.$with('series_cte').as(
    db
      .select({
        serieId: series.serieId,
        teamId: teamgames.teamId,
        gameCount: count(teamgames.teamGameId).as(
          'game_count',
        ),
        goalsArray: jsonAggBuildObject<
          Array<GoalsArrayItem>
        >(
          {
            otWin: teamgames.otWin,
            penalties: games.penalties,
            extraTime: games.extraTime,
            goals: coalesce(
              teamgames.otGoalsConceded,
              teamgames.goalsScored,
              sql<number>`0`,
            ),
          },
          {
            orderBy: [asc(teamgames.date)],
            filter: eq(teamgames.played, true),
          },
        ).as('goals_array'),
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

  // const seriesCte = db.$with('series_cte').as(
  //   db
  //     .select({
  //       serieId: series.serieId,
  //       teamId: teamgames.teamId,
  //       gameCount: count(teamgames.teamGameId).as(
  //         'game_count',
  //       ),
  //       goalsArray: sql<Array<GoalsArrayItem>>`
  //                 coalesce(
  //                     json_agg(
  //                         json_build_object(
  //                         'otWin',teamgames.ot_win,
  //                         'penalties',games.penalties,
  //                         'extraTime',games.extra_time,
  //                         'goals',coalesce(teamgames.ot_goals_scored, teamgames.goals_scored, 0)
  //                         )
  //                     order by teamgames."date" asc
  //                     ) filter (where teamgames.played is true), '[]'::json
  //                 )
  //                 `.as('goals_array'),
  //       awayGoals:
  //         sql`coalesce(sum(case when teamgames.home_game is false then teamgames.goals_scored else 0 end),0)`
  //           .mapWith(Number)
  //           .as('away_goals'),
  //       winCount:
  //         sql`coalesce(sum(case when coalesce(teamgames.ot_win,teamgames.win) is true then 1 else 0 end),0)`
  //           .mapWith(Number)
  //           .as('win_count'),
  //     })
  //     .from(series)
  //     .leftJoin(
  //       seasons,
  //       eq(seasons.seasonId, series.seasonId),
  //     )
  //     .leftJoin(
  //       teamgames,
  //       eq(teamgames.serieId, series.serieId),
  //     )
  //     .leftJoin(games, eq(games.gameId, teamgames.gameId))
  //     .leftJoin(
  //       competitions,
  //       eq(
  //         competitions.competitionId,
  //         series.competitionId,
  //       ),
  //     )
  //     .where(
  //       and(
  //         eq(seasons.intYear, year),
  //         eq(seasons.women, women),
  //         inArray(series.category, [
  //           'semi',
  //           'quarter',
  //           'eight',
  //         ]),
  //       ),
  //     )
  //     .groupBy(series.serieId, teamgames.teamId),
  // )

  const groupsAggWithHelper = db.$with('groups_agg').as(
    db
      .with(seriesCteWithHelper)
      .select({
        serieId: seriesCteWithHelper.serieId,
        serieName: series.serieName,
        level: series.level,
        teamArray: jsonAggBuildObject<
          Array<TeamArrayItemV2>
        >(
          {
            winCount:
              seriesCteWithHelper.winCount as unknown as SQL<number>,
            gameCount:
              seriesCteWithHelper.gameCount as unknown as SQL<number>,
            awayGoals:
              seriesCteWithHelper.awayGoals as unknown as SQL<number>,
            goalsArray:
              seriesCteWithHelper.goalsArray as unknown as SQL<
                Array<GoalsArrayItem>
              >,
            team: jsonBuildObject<
              TeamBaseWithLogo,
              Record<string, Column | SQL>
            >({
              teamId: teams.teamId,
              name: coalesce(
                teamseasonName.name,
                teamnames.name,
              ),
              casualName: coalesce(
                teamseasonName.casualName,
                teamnames.casualName,
              ),
              shortName: coalesce(
                teamseasonName.shortName,
                teamnames.shortName,
              ),
              logo: jsonBuildObject({
                logoId: coalesce(
                  teamseasonLogo.logoId,
                  teamlogos.logoId,
                ),
                hasDark: coalesce(
                  teamseasonLogo.hasDark,
                  teamlogos.hasDark,
                ),
              }),
            }),
          },
          {
            orderBy: [
              desc(teamseries.sortPriority),
              desc(seriesCteWithHelper.winCount),
            ],
          },
        ).as('team_array'),
      })
      .from(seriesCteWithHelper)
      .leftJoin(
        series,
        eq(series.serieId, seriesCteWithHelper.serieId),
      )
      .leftJoin(
        teams,
        eq(teams.teamId, seriesCteWithHelper.teamId),
      )
      .leftJoin(
        teamseasons,
        and(
          eq(teamseasons.teamId, teams.teamId),
          eq(teamseasons.seasonId, series.seasonId),
        ),
      )
      .leftJoin(
        teamnames,
        eq(teamnames.teamnameId, teams.teamnameId),
      )
      .leftJoin(
        teamseasonName,
        eq(
          teamseasons.teamnameId,
          teamseasonName.teamnameId,
        ),
      )
      .leftJoin(
        teamlogos,
        eq(teamlogos.logoId, teamnames.logoId),
      )
      .leftJoin(
        teamseasonLogo,
        eq(teamseasonLogo.logoId, teamseasonName.logoId),
      )
      .leftJoin(
        teamseries,
        and(
          eq(
            teamseries.serieId,
            seriesCteWithHelper.serieId,
          ),
          eq(teamseries.teamId, seriesCteWithHelper.teamId),
        ),
      )
      .groupBy(
        seriesCteWithHelper.serieId,
        series.serieName,
        series.level,
      )
      .orderBy(asc(series.level), series.serieName),
  )

  // const groupsAgg = db.$with('groups_agg').as(
  //   db
  //     .with(seriesCte)
  //     .select({
  //       serieId: seriesCte.serieId,
  //       serieName: series.serieName,
  //       level: series.level,
  //       teamArray: sql<Array<TeamArrayItem>>`
  //                     coalesce(json_agg(
  //                         json_build_object(
  //                             'teamId',teams.team_id,
  //                             'shortName',coalesce(teamseason_name.short_name,teamnames.short_name),
  //                             'name',coalesce(teamseason_name."name",teamnames."name"),
  //                             'casualName',coalesce(teamseason_name.casual_name,teamnames.casual_name),
  //                             'logoId',coalesce(teamseason_logo.logo_id,teamlogos.logo_id),
  //                             'hasDark',coalesce(teamseason_logo.has_dark,teamlogos.has_dark),
  //                             'winCount',series_cte.win_count,
  //                             'gameCount',series_cte.game_count,
  //                             'awayGoals',series_cte.away_goals,
  //                             'goalsArray',series_cte.goals_array
  //                         ) order by teamseries.sort_priority desc, series_cte.win_count desc)
  //                     filter (where teams.team_id is not null), '[]'::json )
  //                 `.as('team_array'),
  //     })
  //     .from(seriesCte)
  //     .leftJoin(
  //       series,
  //       eq(series.serieId, seriesCte.serieId),
  //     )
  //     .leftJoin(teams, eq(teams.teamId, seriesCte.teamId))
  //     .leftJoin(
  //       teamseasons,
  //       and(
  //         eq(teamseasons.teamId, teams.teamId),
  //         eq(teamseasons.seasonId, series.seasonId),
  //       ),
  //     )
  //     .leftJoin(
  //       teamnames,
  //       eq(teamnames.teamnameId, teams.teamnameId),
  //     )
  //     .leftJoin(
  //       teamseasonName,
  //       eq(
  //         teamseasons.teamnameId,
  //         teamseasonName.teamnameId,
  //       ),
  //     )
  //     .leftJoin(
  //       teamlogos,
  //       eq(teamlogos.logoId, teamnames.logoId),
  //     )
  //     .leftJoin(
  //       teamseasonLogo,
  //       eq(teamseasonLogo.logoId, teamseasonName.logoId),
  //     )
  //     .leftJoin(
  //       teamseries,
  //       and(
  //         eq(teamseries.serieId, seriesCte.serieId),
  //         eq(teamseries.teamId, seriesCte.teamId),
  //       ),
  //     )
  //     .groupBy(
  //       seriesCte.serieId,
  //       series.serieName,
  //       series.level,
  //     )
  //     .orderBy(asc(series.level), series.serieName),
  // )

  const arrayWithHelper = await db
    .with(groupsAggWithHelper)
    .select({
      category: series.category as unknown as SQL<string>,
      level: groupsAggWithHelper.level,
      groupArray: jsonAggBuildObject<
        Array<PlayoffGroupsV3>
      >(
        {
          group: series.group,
          serieName: groupsAggWithHelper.serieName,
          teamArray:
            groupsAggWithHelper.teamArray as unknown as SQL<
              Array<TeamArrayItemV2>
            >,
        },
        { orderBy: [asc(groupsAggWithHelper.serieName)] },
      ).as('group_array'),
    })
    .from(groupsAggWithHelper)
    .leftJoin(
      series,
      eq(series.serieId, groupsAggWithHelper.serieId),
    )
    .groupBy(series.category, groupsAggWithHelper.level)
    .orderBy(asc(groupsAggWithHelper.level))

  // const array = await db
  //   .with(groupsAgg)
  //   .select({
  //     category: series.category as unknown as SQL<string>,
  //     level: groupsAgg.level,
  //     groupArray: sql<Array<PlayoffGroupsV2>>`
  //                 json_agg(
  //                     json_build_object(
  //                         'group',series.serie_group_code,
  //                         'serieName',groups_agg.serie_name,
  //                         'teamArray',groups_agg.team_array
  //                     ) order by groups_agg.serie_name
  //                 )
  //               `.as('group_array'),
  //   })
  //   .from(groupsAgg)
  //   .leftJoin(series, eq(series.serieId, groupsAgg.serieId))
  //   .groupBy(series.category, groupsAgg.level)
  //   .orderBy(asc(groupsAgg.level))

  return arrayWithHelper
}
