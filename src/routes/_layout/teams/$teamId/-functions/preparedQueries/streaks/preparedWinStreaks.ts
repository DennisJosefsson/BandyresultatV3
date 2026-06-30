import { db } from '@/db'
import { teamgames, teams } from '@/db/schema'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm'

const win_values = db.$with('win_values').as(
  db
    .select({
      teamId: teamgames.teamId,
      win: teamgames.win,
      date: teamgames.date,
      women: teamgames.women,
      winValue:
        sql<number>`case when win = true then 1 else 0 end`.as(
          'win_value',
        ),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.played, true),
        eq(teamgames.teamId, sql.placeholder('teamId')),
      ),
    ),
)

const summed_win_values = db.$with('summed_win_values').as(
  db
    .with(win_values)
    .select({
      teamId: win_values.teamId,
      win: win_values.win,
      date: win_values.date,
      women: win_values.women,
      sumwins:
        sql<number>`sum(win_values.win_value) over(partition by team order by date)`.as(
          'sum_wins',
        ),
      round:
        sql<number>`row_number() over (partition by team order by date)`.as(
          'round',
        ),
    })
    .from(win_values),
)

const grouped_wins = db.$with('grouped_wins').as(
  db
    .with(summed_win_values)
    .select({
      teamId: summed_win_values.teamId,
      win: summed_win_values.win,
      date: summed_win_values.date,
      women: summed_win_values.women,
      sumwins: summed_win_values.sumwins,
      grouped: sql<number>`round - sum_wins`.as('grouped'),
    })
    .from(summed_win_values)
    .where(eq(summed_win_values.win, true)),
)

const group_array = db.$with('group_array').as(
  db
    .with(grouped_wins)
    .select({
      teamId: grouped_wins.teamId,
      women: grouped_wins.women,
      maxCount:
        sql<number>`mode() within group (order by grouped_wins.grouped)`.as(
          'max_count',
        ),
      dates: sql<
        Array<string>
      >`array_agg(date order by date)`.as('dates'),
    })
    .from(grouped_wins)
    .groupBy(
      grouped_wins.grouped,
      grouped_wins.teamId,
      grouped_wins.women,
    ),
)

export const preparedWinStreaks = db
  .with(group_array)
  .select({
    teamId: group_array.teamId,
    name: teams.name as unknown as SQL<string>,
    women: group_array.women,
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
  .where(
    gt(sql<number>`array_length(group_array.dates,1)`, 5),
  )
  .orderBy(desc(sql`game_count`), asc(sql`start_date`))
  .limit(3)
  .prepare('winStreaks')
