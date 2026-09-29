import { db } from '@/db'
import {
  seasons,
  series,
  teamgames,
  teams,
  teamseries,
} from '@/db/schema'
import { jsonBuildObject } from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type { SQL } from 'drizzle-orm'
import {
  and,
  count,
  countDistinct,
  eq,
  gte,
  inArray,
  lt,
  max,
  min,
  or,
  sql,
} from 'drizzle-orm'
import { intersect } from 'drizzle-orm/pg-core'
import {
  maxConcededAwayArrayTEST,
  maxGoalDifferenceAwayArrayTEST,
  maxScoredAwayArrayTEST,
  maxTotalAwayArrayTEST,
  minGoalDifferenceAwayArrayTEST,
  minTotalAwayArrayTEST,
} from '../stats/awayQueriesTEST'
import {
  maxConcededHomeArrayTEST,
  maxGoalDifferenceHomeArrayTEST,
  maxScoredHomeArrayTEST,
  maxTotalHomeArrayTEST,
  minGoalDifferenceHomeArrayTEST,
  minTotalHomeArrayTEST,
} from '../stats/homeQueriesTEST'
import { drawStreakArray } from '../streaks/preparedDrawStreak'
import { losingStreakArray } from '../streaks/preparedLosingStreak'
import { noWinStreakArray } from '../streaks/preparedNoWinStreak'
import { playoffStreakArray } from '../streaks/preparedPlayoffStreaks'
import { unbeatenStreakArray } from '../streaks/preparedUnbeatenStreak'
import { winStreakArray } from '../streaks/preparedWinStreaks'

const firstDivisionSeasons = db
  .$with('first_division_seasons')
  .as(
    db
      .select({
        count: countDistinct(series.seasonId).as(
          'firstdivisionseasons_count',
        ),
        teamId: teamseries.teamId,
      })
      .from(teamseries)
      .leftJoin(
        series,
        eq(series.serieId, teamseries.serieId),
      )
      .where(
        and(
          eq(teamseries.teamId, sql.placeholder('teamId')),
          lt(series.level, 250),
          eq(series.category, 'regular'),
        ),
      )
      .groupBy(teamseries.teamId),
  )

const getPreparedSecondDivisionSeasons = db
  .selectDistinct({
    seasonId: series.seasonId,
    teamId: teamseries.teamId,
  })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      and(gte(series.level, 300), lt(series.level, 350)),
      eq(series.category, 'regular'),
    ),
  )

const preparedQualificationSeasons = db
  .selectDistinct({
    seasonId: series.seasonId,
    teamId: teamseries.teamId,
  })
  .from(teamseries)
  .leftJoin(series, eq(series.serieId, teamseries.serieId))
  .where(
    and(
      eq(teamseries.teamId, sql.placeholder('teamId')),
      eq(series.level, 250),
    ),
  )

const intersectSeasons = intersect(
  getPreparedSecondDivisionSeasons,
  preparedQualificationSeasons,
).as('intersect_seasons')

const qualificationSeasons = db
  .$with('qualification_seasons')
  .as(
    db
      .with(intersectSeasons)
      .select({
        teamId: intersectSeasons.teamId,
        count: count(intersectSeasons.seasonId).as(
          'qualificationseasons_count',
        ),
      })
      .from(intersectSeasons)
      .groupBy(intersectSeasons.teamId),
  )

const firstAndLatestSeasons = db
  .$with('first_and_last_season')
  .as(
    db
      .select({
        teamId: teamseries.teamId,
        first: min(seasons.intYear).as('first_season'),
        latest: max(seasons.intYear).as('last_season'),
      })
      .from(teamseries)
      .leftJoin(
        series,
        eq(series.serieId, teamseries.serieId),
      )
      .leftJoin(
        seasons,
        eq(series.seasonId, seasons.seasonId),
      )
      .where(
        and(
          eq(teamseries.teamId, sql.placeholder('teamId')),
          lt(series.level, 250),
          or(
            inArray(series.category, [
              'regular',
              'eigth',
              'quarter',
              'semi',
              'final',
            ]),
            inArray(series.group, [
              'SlutspelA',
              'SlutspelB',
            ]),
          ),
        ),
      )
      .groupBy(teamseries.teamId),
  )

const finalCount = db.$with('final_count').as(
  db
    .select({
      count: countDistinct(teamgames.seasonId).as(
        'final_number_count',
      ),
      latest: max(seasons.intYear).as('latest_final'),
      teamId: teamgames.teamId,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        eq(series.category, 'final'),
      ),
    )
    .groupBy(teamgames.teamId),
)

const finalWinCount = db.$with('final_win_count').as(
  db
    .select({
      count: countDistinct(teamgames.seasonId).as(
        'final_wins_count',
      ),
      latest: max(seasons.intYear).as('latest_final_win'),
      teamId: teamgames.teamId,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        eq(series.category, 'final'),
        eq(teamgames.win, true),
      ),
    )
    .groupBy(teamgames.teamId),
)

const playoffCount = db.$with('playoff_count').as(
  db
    .select({
      teamId: teamgames.teamId,
      count: countDistinct(teamgames.seasonId).as(
        'playoff_number_count',
      ),
      latest: max(seasons.intYear).as('latest_playoff'),
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        inArray(series.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
      ),
    )
    .groupBy(teamgames.teamId),
)

export const preparedTeamSeasonStatsTEST = db
  .with(
    firstDivisionSeasons,
    qualificationSeasons,
    firstAndLatestSeasons,
    finalCount,
    finalWinCount,
    playoffCount,
    losingStreakArray,
    drawStreakArray,
    noWinStreakArray,
    playoffStreakArray,
    unbeatenStreakArray,
    winStreakArray,
    maxScoredAwayArrayTEST,
    maxConcededAwayArrayTEST,
    maxTotalAwayArrayTEST,
    minTotalAwayArrayTEST,
    minGoalDifferenceAwayArrayTEST,
    maxGoalDifferenceAwayArrayTEST,
    maxScoredHomeArrayTEST,
    maxConcededHomeArrayTEST,
    maxTotalHomeArrayTEST,
    minTotalHomeArrayTEST,
    minGoalDifferenceHomeArrayTEST,
    maxGoalDifferenceHomeArrayTEST,
  )
  .select({
    teamId: teams.teamId,
    firstDivisionSeasons: jsonBuildObject<{
      count: number | null
    }>({
      count: firstDivisionSeasons.count as unknown as SQL<
        number | null
      >,
    }),
    qualificationSeasons: jsonBuildObject<{
      count: number | null
    }>({
      count: qualificationSeasons.count as unknown as SQL<
        number | null
      >,
    }),
    firstAndLatestFirstDivisionSeason: jsonBuildObject<{
      first: number | null
      latest: number | null
    }>({
      first: firstAndLatestSeasons.first as unknown as SQL<
        number | null
      >,
      latest:
        firstAndLatestSeasons.latest as unknown as SQL<
          number | null
        >,
    }),
    finalCount: jsonBuildObject<{
      count: number | null
      latest: number | null
    }>({
      count: finalCount.count as unknown as SQL<
        number | null
      >,
      latest: finalCount.latest as unknown as SQL<
        number | null
      >,
    }),
    finalWinCount: jsonBuildObject<{
      count: number | null
      latest: number | null
    }>({
      count: finalWinCount.count as unknown as SQL<
        number | null
      >,
      latest: finalWinCount.latest as unknown as SQL<
        number | null
      >,
    }),
    playoffCount: jsonBuildObject<{
      count: number | null
      latest: number | null
    }>({
      count: playoffCount.count as unknown as SQL<
        number | null
      >,
      latest: playoffCount.latest as unknown as SQL<
        number | null
      >,
    }),
    losingStreak: losingStreakArray.streakArray,
    drawStreaks: drawStreakArray.streakArray,
    noWinStreaks: noWinStreakArray.streakArray,
    playoffStreak: playoffStreakArray.streakArray,
    unbeatenStreak: unbeatenStreakArray.streakArray,
    winStreak: winStreakArray.streakArray,
    maxScoredAway: maxScoredAwayArrayTEST.gamesArray,
    maxConcededAway: maxConcededAwayArrayTEST.gamesArray,
    maxTotalAway: maxTotalAwayArrayTEST.gamesArray,
    minTotalAway: minTotalAwayArrayTEST.gamesArray,
    minGoalDifferenceAway:
      minGoalDifferenceAwayArrayTEST.gamesArray,
    maxGoalDifferenceAway:
      maxGoalDifferenceAwayArrayTEST.gamesArray,
    maxScoredHome: maxScoredHomeArrayTEST.gamesArray,
    maxConcededHome: maxConcededHomeArrayTEST.gamesArray,
    maxTotalHome: maxTotalHomeArrayTEST.gamesArray,
    minTotalHome: minTotalHomeArrayTEST.gamesArray,
    minGoalDifferenceHome:
      minGoalDifferenceHomeArrayTEST.gamesArray,
    maxGoalDifferenceHome:
      maxGoalDifferenceHomeArrayTEST.gamesArray,
  })
  .from(teams)
  .leftJoin(
    firstDivisionSeasons,
    eq(firstDivisionSeasons.teamId, teams.teamId),
  )
  .leftJoin(
    qualificationSeasons,
    eq(qualificationSeasons.teamId, teams.teamId),
  )
  .leftJoin(
    firstAndLatestSeasons,
    eq(firstAndLatestSeasons.teamId, teams.teamId),
  )
  .leftJoin(finalCount, eq(finalCount.teamId, teams.teamId))
  .leftJoin(
    finalWinCount,
    eq(finalWinCount.teamId, teams.teamId),
  )
  .leftJoin(
    playoffCount,
    eq(playoffCount.teamId, teams.teamId),
  )
  .leftJoin(
    losingStreakArray,
    eq(losingStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    drawStreakArray,
    eq(drawStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    noWinStreakArray,
    eq(noWinStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    playoffStreakArray,
    eq(playoffStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    unbeatenStreakArray,
    eq(unbeatenStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    winStreakArray,
    eq(winStreakArray.teamId, teams.teamId),
  )
  .leftJoin(
    maxScoredAwayArrayTEST,
    eq(maxScoredAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxConcededAwayArrayTEST,
    eq(maxConcededAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxTotalAwayArrayTEST,
    eq(maxTotalAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    minTotalAwayArrayTEST,
    eq(minTotalAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    minGoalDifferenceAwayArrayTEST,
    eq(minGoalDifferenceAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxGoalDifferenceAwayArrayTEST,
    eq(maxGoalDifferenceAwayArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxScoredHomeArrayTEST,
    eq(maxScoredHomeArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxConcededHomeArrayTEST,
    eq(maxConcededHomeArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxTotalHomeArrayTEST,
    eq(maxTotalHomeArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    minTotalHomeArrayTEST,
    eq(minTotalHomeArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    minGoalDifferenceHomeArrayTEST,
    eq(minGoalDifferenceHomeArrayTEST.teamId, teams.teamId),
  )
  .leftJoin(
    maxGoalDifferenceHomeArrayTEST,
    eq(maxGoalDifferenceHomeArrayTEST.teamId, teams.teamId),
  )
  .where(eq(teams.teamId, sql.placeholder('teamId')))
  .groupBy(
    teams.teamId,
    firstDivisionSeasons.count,
    qualificationSeasons.count,
    firstAndLatestSeasons.first,
    firstAndLatestSeasons.latest,
    finalCount.count,
    finalCount.latest,
    finalWinCount.count,
    finalWinCount.latest,
    playoffCount.count,
    playoffCount.latest,
    losingStreakArray.streakArray,
    noWinStreakArray.streakArray,
    drawStreakArray.streakArray,
    playoffStreakArray.streakArray,
    unbeatenStreakArray.streakArray,
    winStreakArray.streakArray,
    maxScoredAwayArrayTEST.gamesArray,
    maxConcededAwayArrayTEST.gamesArray,
    maxTotalAwayArrayTEST.gamesArray,
    minTotalAwayArrayTEST.gamesArray,
    minGoalDifferenceAwayArrayTEST.gamesArray,
    maxGoalDifferenceAwayArrayTEST.gamesArray,
    maxScoredHomeArrayTEST.gamesArray,
    maxConcededHomeArrayTEST.gamesArray,
    maxTotalHomeArrayTEST.gamesArray,
    minTotalHomeArrayTEST.gamesArray,
    minGoalDifferenceHomeArrayTEST.gamesArray,
    maxGoalDifferenceHomeArrayTEST.gamesArray,
  )
  .prepare('preparedTeamSeasonStatsTEST')
