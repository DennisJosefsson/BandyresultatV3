import { db } from '@/db'
import {
  mvAwayTeamRecords,
  mvHomeTeamRecords,
  mvTeamStats,
  mvTeamStreaks,
} from '@/db/views/teamRecordsViews'
import { eq, sql } from 'drizzle-orm'

// const firstDivisionSeasons = db
//   .$with('first_division_seasons')
//   .as(
//     db
//       .select({
//         count: countDistinct(series.seasonId).as(
//           'firstdivisionseasons_count',
//         ),
//         teamId: teamseries.teamId,
//       })
//       .from(teamseries)
//       .leftJoin(
//         series,
//         eq(series.serieId, teamseries.serieId),
//       )
//       .where(
//         and(
//           eq(teamseries.teamId, sql.placeholder('teamId')),
//           lt(series.level, 250),
//           eq(series.category, 'regular'),
//         ),
//       )
//       .groupBy(teamseries.teamId),
//   )

// const getPreparedSecondDivisionSeasons = db
//   .selectDistinct({
//     seasonId: series.seasonId,
//     teamId: teamseries.teamId,
//   })
//   .from(teamseries)
//   .leftJoin(series, eq(series.serieId, teamseries.serieId))
//   .where(
//     and(
//       eq(teamseries.teamId, sql.placeholder('teamId')),
//       and(gte(series.level, 300), lt(series.level, 350)),
//       eq(series.category, 'regular'),
//     ),
//   )

// const preparedQualificationSeasons = db
//   .selectDistinct({
//     seasonId: series.seasonId,
//     teamId: teamseries.teamId,
//   })
//   .from(teamseries)
//   .leftJoin(series, eq(series.serieId, teamseries.serieId))
//   .where(
//     and(
//       eq(teamseries.teamId, sql.placeholder('teamId')),
//       eq(series.level, 250),
//     ),
//   )

// const intersectSeasons = intersect(
//   getPreparedSecondDivisionSeasons,
//   preparedQualificationSeasons,
// ).as('intersect_seasons')

// const qualificationSeasons = db
//   .$with('qualification_seasons')
//   .as(
//     db
//       .with(intersectSeasons)
//       .select({
//         teamId: intersectSeasons.teamId,
//         count: count(intersectSeasons.seasonId).as(
//           'qualificationseasons_count',
//         ),
//       })
//       .from(intersectSeasons)
//       .groupBy(intersectSeasons.teamId),
//   )

// const firstAndLatestSeasons = db
//   .$with('first_and_last_season')
//   .as(
//     db
//       .select({
//         teamId: teamseries.teamId,
//         first: min(seasons.year).as('first_season'),
//         latest: max(seasons.year).as('last_season'),
//       })
//       .from(teamseries)
//       .leftJoin(
//         series,
//         eq(series.serieId, teamseries.serieId),
//       )
//       .leftJoin(
//         seasons,
//         eq(series.seasonId, seasons.seasonId),
//       )
//       .where(
//         and(
//           eq(teamseries.teamId, sql.placeholder('teamId')),
//           lt(series.level, 250),
//           or(
//             inArray(series.category, [
//               'regular',
//               'eigth',
//               'quarter',
//               'semi',
//               'final',
//             ]),
//             inArray(series.group, [
//               'SlutspelA',
//               'SlutspelB',
//             ]),
//           ),
//         ),
//       )
//       .groupBy(teamseries.teamId),
//   )

// const finalCount = db.$with('final_count').as(
//   db
//     .select({
//       count: countDistinct(teamgames.seasonId).as(
//         'final_number_count',
//       ),
//       latest: max(seasons.intYear).as('latest_final'),
//       teamId: teamgames.teamId,
//     })
//     .from(teamgames)
//     .leftJoin(series, eq(series.serieId, teamgames.serieId))
//     .leftJoin(
//       seasons,
//       eq(seasons.seasonId, teamgames.seasonId),
//     )
//     .where(
//       and(
//         eq(teamgames.teamId, sql.placeholder('teamId')),
//         eq(series.category, 'final'),
//       ),
//     )
//     .groupBy(teamgames.teamId),
// )

// const finalWinCount = db.$with('final_win_count').as(
//   db
//     .select({
//       count: countDistinct(teamgames.seasonId).as(
//         'final_wins_count',
//       ),
//       latest: max(seasons.intYear).as('latest_final_win'),
//       teamId: teamgames.teamId,
//     })
//     .from(teamgames)
//     .leftJoin(series, eq(series.serieId, teamgames.serieId))
//     .leftJoin(
//       seasons,
//       eq(seasons.seasonId, teamgames.seasonId),
//     )
//     .where(
//       and(
//         eq(teamgames.teamId, sql.placeholder('teamId')),
//         eq(series.category, 'final'),
//         eq(teamgames.win, true),
//       ),
//     )
//     .groupBy(teamgames.teamId),
// )

// const playoffCount = db.$with('playoff_count').as(
//   db
//     .select({
//       teamId: teamgames.teamId,
//       count: countDistinct(teamgames.seasonId).as(
//         'playoff_number_count',
//       ),
//       latest: max(seasons.intYear).as('latest_playoff'),
//     })
//     .from(teamgames)
//     .leftJoin(series, eq(series.serieId, teamgames.serieId))
//     .leftJoin(
//       seasons,
//       eq(seasons.seasonId, teamgames.seasonId),
//     )
//     .where(
//       and(
//         eq(teamgames.teamId, sql.placeholder('teamId')),
//         inArray(series.category, [
//           'playoffseries',
//           'quarter',
//           'semi',
//           'final',
//         ]),
//       ),
//     )
//     .groupBy(teamgames.teamId),
// )

// export const preparedTeamSeasonStats = db
//   .with(
//     firstDivisionSeasons,
//     qualificationSeasons,
//     firstAndLatestSeasons,
//     finalCount,
//     finalWinCount,
//     playoffCount,
//     losingStreakArray,
//     drawStreakArray,
//     noWinStreakArray,
//     playoffStreakArray,
//     unbeatenStreakArray,
//     winStreakArray,
//     maxScoredAwayArray,
//     maxConcededAwayArray,
//     maxTotalAwayArray,
//     minTotalAwayArray,
//     minGoalDifferenceAwayArray,
//     maxGoalDifferenceAwayArray,
//     maxScoredHomeArray,
//     maxConcededHomeArray,
//     maxTotalHomeArray,
//     minTotalHomeArray,
//     minGoalDifferenceHomeArray,
//     maxGoalDifferenceHomeArray,
//   )
//   .select({
//     teamId: teams.teamId,
//     firstDivisionSeasons: jsonBuildObject<{
//       count: number | null
//     }>({
//       count: firstDivisionSeasons.count as unknown as SQL<
//         number | null
//       >,
//     }),
//     qualificationSeasons: jsonBuildObject<{
//       count: number | null
//     }>({
//       count: qualificationSeasons.count as unknown as SQL<
//         number | null
//       >,
//     }),
//     firstAndLatestFirstDivisionSeason: jsonBuildObject<{
//       first: string | null
//       latest: string | null
//     }>({
//       first: firstAndLatestSeasons.first as unknown as SQL<
//         number | null
//       >,
//       latest:
//         firstAndLatestSeasons.latest as unknown as SQL<
//           number | null
//         >,
//     }),
//     finalCount: jsonBuildObject<{
//       count: number | null
//       latest: number | null
//     }>({
//       count: finalCount.count as unknown as SQL<
//         number | null
//       >,
//       latest: finalCount.latest as unknown as SQL<
//         number | null
//       >,
//     }),
//     finalWinCount: jsonBuildObject<{
//       count: number | null
//       latest: number | null
//     }>({
//       count: finalWinCount.count as unknown as SQL<
//         number | null
//       >,
//       latest: finalWinCount.latest as unknown as SQL<
//         number | null
//       >,
//     }),
//     playoffCount: jsonBuildObject<{
//       count: number | null
//       latest: number | null
//     }>({
//       count: playoffCount.count as unknown as SQL<
//         number | null
//       >,
//       latest: playoffCount.latest as unknown as SQL<
//         number | null
//       >,
//     }),
//     losingStreak: losingStreakArray.streakArray,
//     drawStreaks: drawStreakArray.streakArray,
//     noWinStreaks: noWinStreakArray.streakArray,
//     playoffStreak: playoffStreakArray.streakArray,
//     unbeatenStreak: unbeatenStreakArray.streakArray,
//     winStreak: winStreakArray.streakArray,
//     maxScoredAway: maxScoredAwayArray.gamesArray,
//     maxConcededAway: maxConcededAwayArray.gamesArray,
//     maxTotalAway: maxTotalAwayArray.gamesArray,
//     minTotalAway: minTotalAwayArray.gamesArray,
//     minGoalDifferenceAway:
//       minGoalDifferenceAwayArray.gamesArray,
//     maxGoalDifferenceAway:
//       maxGoalDifferenceAwayArray.gamesArray,
//     maxScoredHome: maxScoredHomeArray.gamesArray,
//     maxConcededHome: maxConcededHomeArray.gamesArray,
//     maxTotalHome: maxTotalHomeArray.gamesArray,
//     minTotalHome: minTotalHomeArray.gamesArray,
//     minGoalDifferenceHome:
//       minGoalDifferenceHomeArray.gamesArray,
//     maxGoalDifferenceHome:
//       maxGoalDifferenceHomeArray.gamesArray,
//   })
//   .from(teams)
//   .leftJoin(
//     firstDivisionSeasons,
//     eq(firstDivisionSeasons.teamId, teams.teamId),
//   )
//   .leftJoin(
//     qualificationSeasons,
//     eq(qualificationSeasons.teamId, teams.teamId),
//   )
//   .leftJoin(
//     firstAndLatestSeasons,
//     eq(firstAndLatestSeasons.teamId, teams.teamId),
//   )
//   .leftJoin(finalCount, eq(finalCount.teamId, teams.teamId))
//   .leftJoin(
//     finalWinCount,
//     eq(finalWinCount.teamId, teams.teamId),
//   )
//   .leftJoin(
//     playoffCount,
//     eq(playoffCount.teamId, teams.teamId),
//   )
//   .leftJoin(
//     losingStreakArray,
//     eq(losingStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     drawStreakArray,
//     eq(drawStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     noWinStreakArray,
//     eq(noWinStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     playoffStreakArray,
//     eq(playoffStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     unbeatenStreakArray,
//     eq(unbeatenStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     winStreakArray,
//     eq(winStreakArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxScoredAwayArray,
//     eq(maxScoredAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxConcededAwayArray,
//     eq(maxConcededAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxTotalAwayArray,
//     eq(maxTotalAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     minTotalAwayArray,
//     eq(minTotalAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     minGoalDifferenceAwayArray,
//     eq(minGoalDifferenceAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxGoalDifferenceAwayArray,
//     eq(maxGoalDifferenceAwayArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxScoredHomeArray,
//     eq(maxScoredHomeArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxConcededHomeArray,
//     eq(maxConcededHomeArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxTotalHomeArray,
//     eq(maxTotalHomeArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     minTotalHomeArray,
//     eq(minTotalHomeArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     minGoalDifferenceHomeArray,
//     eq(minGoalDifferenceHomeArray.teamId, teams.teamId),
//   )
//   .leftJoin(
//     maxGoalDifferenceHomeArray,
//     eq(maxGoalDifferenceHomeArray.teamId, teams.teamId),
//   )
//   .where(eq(teams.teamId, sql.placeholder('teamId')))
//   .groupBy(
//     teams.teamId,
//     firstDivisionSeasons.count,
//     qualificationSeasons.count,
//     firstAndLatestSeasons.first,
//     firstAndLatestSeasons.latest,
//     finalCount.count,
//     finalCount.latest,
//     finalWinCount.count,
//     finalWinCount.latest,
//     playoffCount.count,
//     playoffCount.latest,
//     losingStreakArray.streakArray,
//     noWinStreakArray.streakArray,
//     drawStreakArray.streakArray,
//     playoffStreakArray.streakArray,
//     unbeatenStreakArray.streakArray,
//     winStreakArray.streakArray,
//     maxScoredAwayArray.gamesArray,
//     maxConcededAwayArray.gamesArray,
//     maxTotalAwayArray.gamesArray,
//     minTotalAwayArray.gamesArray,
//     minGoalDifferenceAwayArray.gamesArray,
//     maxGoalDifferenceAwayArray.gamesArray,
//     maxScoredHomeArray.gamesArray,
//     maxConcededHomeArray.gamesArray,
//     maxTotalHomeArray.gamesArray,
//     minTotalHomeArray.gamesArray,
//     minGoalDifferenceHomeArray.gamesArray,
//     maxGoalDifferenceHomeArray.gamesArray,
//   )
//   .prepare('preparedTeamSeasonStats')

export const preparedTeamRecordsHome = db
  .select()
  .from(mvHomeTeamRecords)
  .where(
    eq(mvHomeTeamRecords.teamId, sql.placeholder('teamId')),
  )
  .prepare('preparedTeamRecordsHome')

export const preparedTeamRecordsAway = db
  .select()
  .from(mvAwayTeamRecords)
  .where(
    eq(mvAwayTeamRecords.teamId, sql.placeholder('teamId')),
  )
  .prepare('preparedTeamRecordsAway')

export const preparedTeamStreaks = db
  .select()
  .from(mvTeamStreaks)
  .where(
    eq(mvTeamStreaks.teamId, sql.placeholder('teamId')),
  )
  .prepare('preparedTeamStreaks')

export const preparedTeamStats = db
  .select()
  .from(mvTeamStats)
  .where(eq(mvTeamStats.teamId, sql.placeholder('teamId')))
  .prepare('preparedTeamStats')
