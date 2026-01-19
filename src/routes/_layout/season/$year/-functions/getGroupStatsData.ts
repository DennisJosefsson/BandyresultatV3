import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { Serie } from '@/lib/types/serie'
import {
  and,
  asc,
  avg,
  desc,
  eq,
  gt,
  inArray,
  max,
  SQL,
  sql,
  sum,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type GetGroupStatsDataProps = { serie: Serie }

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export async function getGroupStatsData({ serie }: GetGroupStatsDataProps) {
  const goalData = await db
    .select({
      goalsScoredTotal: sum(teamgames.totalGoals).mapWith(Number),
      goalsScoredAvg: avg(teamgames.totalGoals).mapWith(Number),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
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
    .where(and(eq(games.serieId, serie.serieId), eq(games.played, true)))
    .then((res) => res[0])

  const awayGoalData = await db
    .select({
      goalsScoredTotal: sum(games.awayGoal).mapWith(Number),
      goalsScoredAvg: avg(games.awayGoal).mapWith(Number),
    })
    .from(games)
    .where(and(eq(games.serieId, serie.serieId), eq(games.played, true)))
    .then((res) => res[0])

  const homeGameData = await db
    .select({
      winTotal: sql`sum(case when teamgames.win = true then 1 else 0 end)`
        .mapWith(Number)
        .as('win_total'),
      winAvg:
        sql`round(avg(case when teamgames.win = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('win_avg'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const awayGameData = await db
    .select({
      winTotal: sql`sum(case when teamgames.win = true then 1 else 0 end)`
        .mapWith(Number)
        .as('win_total'),
      winAvg:
        sql`round(avg(case when teamgames.win = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('win_avg'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(teamgames.homeGame, false),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const drawData = await db
    .select({
      drawTotal: sql`sum(case when teamgames.draw = true then 1 else 0 end)`
        .mapWith(Number)
        .as('draw_total'),
      drawAvg:
        sql`round(avg(case when teamgames.draw = true then 1 else 0 end)::numeric,3) * 100`
          .mapWith(Number)
          .as('draw_avg'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .then((res) => res[0])

  const winStreak = await getStreak({
    serie,
    threshold: 5,
    streak: 'winStreak',
  })

  const losingStreak = await getStreak({
    serie,
    threshold: 3,
    streak: 'losingStreak',
  })

  const drawStreak = await getStreak({
    serie,
    threshold: 2,
    streak: 'drawStreak',
  })

  const noWinStreak = await getStreak({
    serie,
    threshold: 5,
    streak: 'noWinStreak',
  })

  const unbeatenStreak = await getStreak({
    serie,
    threshold: 5,
    streak: 'unbeatenStreak',
  })

  const maxGoals = await db
    .select({
      date: games.date,
      result: games.result,
      value: sql`games.home_goal + games.away_goal`.mapWith(Number).as('value'),
      home: {
        teamId: home.teamId,
        name: home.name,
        gameId: games.gameId,
        shortName: home.shortName,
        casualName: home.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        shortName: away.shortName,
        casualName: away.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(games)
    .leftJoin(home, eq(home.teamId, games.homeTeamId))
    .leftJoin(away, eq(away.teamId, games.awayTeamId))
    .where(
      and(
        eq(games.serieId, serie.serieId),
        sql`(games.home_goal + games.away_goal) = (select max(teamgames.total_goals) from "teamgames" where "teamgames"."serie_id" = ${serie.serieId} and "teamgames"."played" = true)`,
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
      value: sql`games.home_goal + games.away_goal`.mapWith(Number).as('value'),
      home: {
        teamId: home.teamId,
        name: home.name,
        shortName: home.shortName,
        casualName: home.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        shortName: away.shortName,
        casualName: away.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(games)
    .leftJoin(home, eq(home.teamId, games.homeTeamId))
    .leftJoin(away, eq(away.teamId, games.awayTeamId))
    .where(
      and(
        eq(games.serieId, serie.serieId),
        sql`(games.home_goal + games.away_goal) = (select min(teamgames.total_goals) from "teamgames" where "teamgames"."serie_id" = ${serie.serieId} and "teamgames"."played" = true)`,
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
    .where(
      and(
        eq(teamgames.serieId, serie.serieId),
        eq(
          teamgames.goalDifference,
          db
            .select({
              goalDifference: max(teamgames.goalDifference).as(
                'goal_difference',
              ),
            })
            .from(teamgames)
            .where(
              and(
                eq(teamgames.serieId, serie.serieId),
                eq(teamgames.played, true),
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
        name: home.name,
        shortName: home.shortName,
        casualName: home.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      away: {
        teamId: away.teamId,
        name: away.name,
        shortName: away.shortName,
        casualName: away.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(games)
    .leftJoin(home, eq(home.teamId, games.homeTeamId))
    .leftJoin(away, eq(away.teamId, games.awayTeamId))
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
  serie: Serie
  threshold: number
  streak:
    | 'winStreak'
    | 'drawStreak'
    | 'losingStreak'
    | 'noWinStreak'
    | 'unbeatenStreak'
}

async function getStreak({ serie, threshold, streak }: StreakFunctionProps) {
  let values
  switch (streak) {
    case 'winStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            win: teamgames.win,
            draw: teamgames.draw,
            lost: teamgames.lost,
            date: teamgames.date,
            value: sql<number>`case when win = true then 1 else 0 end`.as(
              'value',
            ),
          })
          .from(teamgames)
          .where(
            and(
              eq(teamgames.played, true),
              eq(teamgames.serieId, serie.serieId),
            ),
          ),
      )
      break
    case 'drawStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            win: teamgames.win,
            draw: teamgames.draw,
            lost: teamgames.lost,
            date: teamgames.date,
            value: sql<number>`case when draw = true then 1 else 0 end`.as(
              'value',
            ),
          })
          .from(teamgames)
          .where(
            and(
              eq(teamgames.played, true),
              eq(teamgames.serieId, serie.serieId),
            ),
          ),
      )
      break
    case 'losingStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            win: teamgames.win,
            draw: teamgames.draw,
            lost: teamgames.lost,
            date: teamgames.date,
            value: sql<number>`case when lost = true then 1 else 0 end`.as(
              'value',
            ),
          })
          .from(teamgames)
          .where(
            and(
              eq(teamgames.played, true),
              eq(teamgames.serieId, serie.serieId),
            ),
          ),
      )
      break
    case 'noWinStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            win: teamgames.win,
            draw: teamgames.draw,
            lost: teamgames.lost,
            date: teamgames.date,
            value: sql<number>`case when win = false then 1 else 0 end`.as(
              'value',
            ),
          })
          .from(teamgames)
          .where(
            and(
              eq(teamgames.played, true),
              eq(teamgames.serieId, serie.serieId),
            ),
          ),
      )
      break
    case 'unbeatenStreak':
      values = db.$with('values').as(
        db
          .select({
            teamId: teamgames.teamId,
            win: teamgames.win,
            draw: teamgames.draw,
            lost: teamgames.lost,
            date: teamgames.date,
            value: sql<number>`case when lost = false then 1 else 0 end`.as(
              'value',
            ),
          })
          .from(teamgames)
          .where(
            and(
              eq(teamgames.played, true),
              eq(teamgames.serieId, serie.serieId),
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
        win: values.win,
        draw: values.draw,
        lost: values.lost,
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

  let whereQuery
  switch (streak) {
    case 'winStreak':
      whereQuery = eq(summed_values.win, true)
      break
    case 'drawStreak':
      whereQuery = eq(summed_values.draw, true)
      break
    case 'losingStreak':
      whereQuery = eq(summed_values.lost, true)
      break
    case 'noWinStreak':
      whereQuery = eq(summed_values.win, false)
      break
    case 'unbeatenStreak':
      whereQuery = eq(summed_values.lost, false)
      break
    default:
      throw new Error('Felaktig funktionsanrop, whereQuery')
  }

  const grouped_results = db.$with('grouped_results').as(
    db
      .with(summed_values)
      .select({
        teamId: summed_values.teamId,
        date: summed_values.date,
        sumResults: summed_values.sumResults,
        grouped: sql<number>`round - sum_results`.as('grouped'),
      })
      .from(summed_values)
      .where(whereQuery),
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_results)
      .groupBy(grouped_results.grouped, grouped_results.teamId),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      gameCount: sql<number>`array_length(group_array.dates,1)`.as(
        'game_count',
      ),
      startDate: sql<string>`group_array.dates[1]`.as('start_date'),
      endDate:
        sql<string>`group_array.dates[array_upper(group_array.dates,1)]`.as(
          'end_date',
        ),
    })
    .from(group_array)
    .leftJoin(teams, eq(teams.teamId, group_array.teamId))
    .where(gt(sql<number>`array_length(group_array.dates,1)`, threshold))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}
