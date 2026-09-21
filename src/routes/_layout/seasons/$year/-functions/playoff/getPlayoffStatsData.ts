import { db } from '@/db'
import type { playoffseason } from '@/db/schema'
import {
  games,
  series,
  teamgames,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
} from '@/db/schema'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  avg,
  desc,
  eq,
  gt,
  inArray,
  max,
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

type GetPlayoffStatsDataProps = {
  playoffSeason: typeof playoffseason.$inferSelect
}

export async function getPlayoffStatsData({
  playoffSeason,
}: GetPlayoffStatsDataProps) {
  const goalData = await db
    .select({
      goalsScoredTotal: sum(teamgames.totalGoals).mapWith(
        Number,
      ),
      goalsScoredAvg: avg(teamgames.totalGoals).mapWith(
        Number,
      ),
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.seasonId, playoffSeason.seasonId),
        eq(teamgames.playoff, true),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const homeGoalData = await db
    .select({
      goalsScoredTotal: sum(games.homeGoal).mapWith(Number),
      goalsScoredAvg: avg(games.homeGoal).mapWith(Number),
    })
    .from(games)
    .leftJoin(series, eq(series.serieId, games.serieId))
    .where(
      and(
        eq(games.seasonId, playoffSeason.seasonId),
        eq(games.playoff, true),
        eq(games.played, true),
      ),
    )
    .then((res) => res[0])

  const awayGoalData = await db
    .select({
      goalsScoredTotal: sum(games.awayGoal).mapWith(Number),
      goalsScoredAvg: avg(games.awayGoal).mapWith(Number),
    })
    .from(games)
    .leftJoin(series, eq(series.serieId, games.serieId))
    .where(
      and(
        eq(games.seasonId, playoffSeason.seasonId),
        eq(games.playoff, true),
        eq(games.played, true),
      ),
    )
    .then((res) => res[0])

  const homeGameData = await db
    .select({
      winTotal:
        sql`sum(case when teamgames.win = true then 1 else 0 end)`
          .mapWith(Number)
          .as('win_total'),
      winAvg:
        sql`round(avg(case when teamgames.win = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('win_avg'),
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.seasonId, playoffSeason.seasonId),
        eq(teamgames.playoff, true),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const awayGameData = await db
    .select({
      winTotal:
        sql`sum(case when teamgames.win = true then 1 else 0 end)`
          .mapWith(Number)
          .as('win_total'),
      winAvg:
        sql`round(avg(case when teamgames.win = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('win_avg'),
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.seasonId, playoffSeason.seasonId),
        eq(teamgames.playoff, true),
        eq(teamgames.homeGame, false),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const drawData = await db
    .select({
      drawTotal:
        sql`sum(case when teamgames.draw = true then 1 else 0 end)`
          .mapWith(Number)
          .as('draw_total'),
      drawAvg:
        sql`round(avg(case when teamgames.draw = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('draw_avg'),
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.seasonId, playoffSeason.seasonId),
        eq(teamgames.playoff, true),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const winStreak = await getStreak({
    playoffSeason,
    threshold: 5,
    streak: 'winStreak',
  })

  const losingStreak = await getStreak({
    playoffSeason,
    threshold: 3,
    streak: 'losingStreak',
  })

  const drawStreak = await getStreak({
    playoffSeason,
    threshold: 2,
    streak: 'drawStreak',
  })

  const noWinStreak = await getStreak({
    playoffSeason,
    threshold: 5,
    streak: 'noWinStreak',
  })

  const unbeatenStreak = await getStreak({
    playoffSeason,
    threshold: 5,
    streak: 'unbeatenStreak',
  })

  const maxGoals = await db
    .select({
      date: games.date,
      result: games.result,
      value: sql`games.home_goal + games.away_goal`
        .mapWith(Number)
        .as('value'),
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
        eq(games.seasonId, playoffSeason.seasonId),
        eq(games.playoff, true),
        sql`(games.home_goal + games.away_goal) = (select max(teamgames.total_goals) from "teamgames" where "teamgames"."season_id" = ${playoffSeason.seasonId} and "teamgames"."played" = true and "teamgames"."playoff" = true)`,
      ),
    )
    .orderBy(asc(games.date))
    .then((res) => {
      if (res.length === 0)
        return {
          value: 0,
          games: [],
        }
      return {
        value: res[0].value,
        games: res,
      }
    })

  const minGoals = await db
    .select({
      date: games.date,
      result: games.result,
      gameId: games.gameId,
      value: sql`games.home_goal + games.away_goal`
        .mapWith(Number)
        .as('value'),
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
        eq(games.seasonId, playoffSeason.seasonId),
        eq(games.playoff, true),
        sql`(games.home_goal + games.away_goal) = (select min(teamgames.total_goals) from "teamgames" where "teamgames"."season_id" = ${playoffSeason.seasonId} and "teamgames"."played" = true and "teamgames"."playoff" = true)`,
      ),
    )
    .orderBy(asc(games.date))
    .then((res) => {
      if (res.length === 0)
        return {
          value: 0,
          games: [],
        }
      return {
        value: res[0].value,
        games: res,
      }
    })

  const nestedQuery = db
    .select({ gameId: teamgames.gameId })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .where(
      and(
        eq(teamgames.seasonId, playoffSeason.seasonId),
        eq(teamgames.playoff, true),
        eq(
          teamgames.goalDifference,
          db
            .select({
              goalDifference: max(
                teamgames.goalDifference,
              ).as('goal_difference'),
            })
            .from(teamgames)
            .where(
              and(
                eq(
                  teamgames.seasonId,
                  playoffSeason.seasonId,
                ),
                eq(teamgames.played, true),
                eq(teamgames.playoff, true),
              ),
            ),
        ),
      ),
    )

  const maxDiff = await db
    .select({
      date: games.date,
      result: games.result,
      value: sql`abs(games.home_goal - games.away_goal)`
        .mapWith(Number)
        .as('value'),
      gameId: games.gameId,
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
    .where(inArray(games.gameId, nestedQuery))
    .orderBy(asc(games.date))
    .then((res) => {
      if (res.length === 0)
        return {
          value: 0,
          games: [],
        }
      return {
        value: res[0].value,
        games: res,
      }
    })

  return {
    goalData,
    homeGoalData,
    awayGoalData,
    homeGameData,
    awayGameData,
    drawData,
    winStreak,
    drawStreak,
    losingStreak,
    noWinStreak,
    unbeatenStreak,
    maxGoals,
    minGoals,
    maxDiff,
  }
}

type StreakFunctionProps = {
  playoffSeason: typeof playoffseason.$inferSelect
  threshold: number
  streak:
    | 'winStreak'
    | 'drawStreak'
    | 'losingStreak'
    | 'noWinStreak'
    | 'unbeatenStreak'
}

async function getStreak({
  playoffSeason,
  threshold,
  streak,
}: StreakFunctionProps) {
  let values
  switch (streak) {
    case 'winStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            result: teamgames.win,
            date: teamgames.date,
            value:
              sql<number>`case when win = true then 1 else 0 end`.as(
                'value',
              ),
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .where(
            and(
              eq(teamgames.played, true),
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          ),
      )
      break
    case 'drawStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            result: teamgames.draw,
            date: teamgames.date,
            value:
              sql<number>`case when draw = true then 1 else 0 end`.as(
                'value',
              ),
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .where(
            and(
              eq(teamgames.played, true),
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          ),
      )
      break
    case 'losingStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            result: teamgames.lost,
            date: teamgames.date,
            value:
              sql<number>`case when lost = true then 1 else 0 end`.as(
                'value',
              ),
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .where(
            and(
              eq(teamgames.played, true),
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          ),
      )
      break
    case 'noWinStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            result: teamgames.win,
            date: teamgames.date,
            value:
              sql<number>`case when win = false then 1 else 0 end`.as(
                'value',
              ),
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .where(
            and(
              eq(teamgames.played, true),
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          ),
      )
      break
    case 'unbeatenStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            result: teamgames.lost,
            date: teamgames.date,
            value:
              sql<number>`case when lost = false then 1 else 0 end`.as(
                'value',
              ),
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .where(
            and(
              eq(teamgames.played, true),
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          ),
      )
      break
    default:
      throw new Error('Felaktig funktionsanrop.')
  }

  const summed_values = db.$with('summed_values').as(
    db
      .with(values)
      .select({
        teamId: values.teamId,
        result: values.result,
        date: values.date,
        sumResults:
          sql<number>`sum(values.value) over(partition by team order by date)`.as(
            'sum_results',
          ),
        round:
          sql<number>`row_number() over (partition by team order by date)`.as(
            'round',
          ),
      })
      .from(values),
  )

  const grouped_results = db.$with('grouped_results').as(
    db
      .with(summed_values)
      .select({
        teamId: summed_values.teamId,
        result: summed_values.result,
        date: summed_values.date,
        sumResults: summed_values.sumResults,
        grouped: sql<number>`round - sum_results`.as(
          'grouped',
        ),
      })
      .from(summed_values)
      .where(
        eq(
          summed_values.result,
          streak === 'unbeatenStreak' ||
            streak === 'noWinStreak'
            ? false
            : true,
        ),
      ),
  )

  const group_array = db.$with('group_array').as(
    db
      .with(grouped_results)
      .select({
        teamId: grouped_results.teamId,
        maxCount:
          sql<number>`mode() within group (order by grouped_results.grouped)`.as(
            'max_count',
          ),
        dates: sql<
          Array<string>
        >`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_results)
      .groupBy(
        grouped_results.grouped,
        grouped_results.teamId,
      ),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      team: {
        teamId: group_array.teamId,
        name: coalesce(teamseasonName.name, teamnames.name),
        casualName: coalesce(
          teamseasonName.casualName,
          teamnames.casualName,
        ),
        shortName: coalesce(
          teamseasonName.shortName,
          teamnames.shortName,
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
      gameCount:
        sql<number>`array_length(group_array.dates,1)`.as(
          'game_count',
        ),
      startDate: sql<string>`group_array.dates[1]`.as(
        'start_date',
      ),
      endDate:
        sql<string>`group_array.dates[array_upper(group_array.dates,1)]`.as(
          'end_date',
        ),
    })
    .from(group_array)
    .leftJoin(teams, eq(teams.teamId, group_array.teamId))
    .leftJoin(
      teamseasons,
      and(
        eq(teamseasons.teamId, teams.teamId),
        eq(teamseasons.seasonId, playoffSeason.seasonId),
      ),
    )
    .leftJoin(
      teamnames,
      eq(teamnames.teamnameId, teams.teamnameId),
    )
    .leftJoin(
      teamseasonName,
      eq(teamseasonName.teamnameId, teamseasons.teamnameId),
    )
    .leftJoin(
      teamlogos,
      eq(teamlogos.logoId, teamnames.logoId),
    )
    .leftJoin(
      teamseasonLogo,
      eq(teamseasonLogo.logoId, teamseasonName.logoId),
    )
    .where(
      gt(
        sql<number>`array_length(group_array.dates,1)`,
        threshold,
      ),
    )
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}
