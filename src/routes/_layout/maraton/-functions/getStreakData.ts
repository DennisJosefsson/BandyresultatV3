import { db } from '@/db'
import { series, teamgames, teams } from '@/db/schema'
import { and, asc, desc, eq, lt, sql, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const team = alias(teams, 'team')
const opponent = alias(teams, 'opponent')

export async function getStreakData({ women }: { women: boolean }) {
  const currInoffChamps = await db
    .select({
      date: teamgames.date,
      goalsScored: teamgames.goalsScored,
      goalsConceded: teamgames.goalsConceded,
      team: {
        teamId: team.teamId,
        name: team.name,
        shortName: team.shortName,
        casualName: team.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
      opponent: {
        teamId: opponent.teamId,
        name: opponent.name,
        shortName: opponent.shortName,
        casualName: opponent.casualName,
      } as unknown as SQL<{
        teamId: number
        name: string
        shortName: string
        casualName: string
      }>,
    })
    .from(teamgames)
    .leftJoin(team, eq(team.teamId, teamgames.teamId))
    .leftJoin(opponent, eq(opponent.teamId, teamgames.teamId))
    .where(and(eq(teamgames.women, women), eq(teamgames.currInoffChamp, true)))
    .orderBy(desc(teamgames.date))
    .limit(10)
    .then((res) =>
      res.map((team) => {
        return {
          date: team.date,
          result: `${team.goalsConceded}-${team.goalsConceded}`,
          team: team.team,
          opponent: team.opponent,
        }
      }),
    )

  const currInoffChampsCount = await db.$count(
    teamgames,
    and(eq(teamgames.currInoffChamp, true), eq(teamgames.women, women)),
  )

  const currInoffChampsObject = {
    count: currInoffChampsCount,
    games: currInoffChamps,
  }

  const winStreak = await getStreak({
    women,
    streak: 'winStreak',
  })

  const losingStreak = await getStreak({
    women,
    streak: 'losingStreak',
  })

  const drawStreak = await getStreak({
    women,
    streak: 'drawStreak',
  })

  const noWinStreak = await getStreak({
    women,
    streak: 'noWinStreak',
  })

  const unbeatenStreak = await getStreak({
    women,
    streak: 'unbeatenStreak',
  })

  return {
    currInoffChamps: currInoffChampsObject,
    winStreak,
    losingStreak,
    drawStreak,
    noWinStreak,
    unbeatenStreak,
  }
}

type StreakFunctionProps = {
  women: boolean
  streak:
    | 'winStreak'
    | 'drawStreak'
    | 'losingStreak'
    | 'noWinStreak'
    | 'unbeatenStreak'
}

async function getStreak({ women, streak }: StreakFunctionProps) {
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
          .leftJoin(series, eq(series.serieId, teamgames.serieId))
          .where(
            and(
              eq(teamgames.played, true),
              lt(series.level, 2),
              eq(teamgames.women, women),
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
          .leftJoin(series, eq(series.serieId, teamgames.serieId))
          .where(
            and(
              eq(teamgames.played, true),
              lt(series.level, 2),
              eq(teamgames.women, women),
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
          .leftJoin(series, eq(series.serieId, teamgames.serieId))
          .where(
            and(
              eq(teamgames.played, true),
              lt(series.level, 2),
              eq(teamgames.women, women),
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
          .leftJoin(series, eq(series.serieId, teamgames.serieId))
          .where(
            and(
              eq(teamgames.played, true),
              lt(series.level, 2),
              eq(teamgames.women, women),
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
          .leftJoin(series, eq(series.serieId, teamgames.serieId))
          .where(
            and(
              eq(teamgames.played, true),
              lt(series.level, 2),
              eq(teamgames.women, women),
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
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(20)
    .then((res) => {
      const tenthCount =
        res.length >= 10 ? res[9].gameCount : res[res.length - 1].gameCount
      const filteredResult = res
        .filter((item) => item.gameCount >= tenthCount)
        .map((item, index) => {
          return { ...item, position: index + 1 }
        })
      return filteredResult.map((item, index) => {
        return {
          ...item,
          position:
            index !== 0 &&
            filteredResult[index - 1].gameCount === item.gameCount
              ? filteredResult.find((res) => res.gameCount === item.gameCount)
                  ?.position
              : item.position,
        }
      })
    })

  return streaks
}
