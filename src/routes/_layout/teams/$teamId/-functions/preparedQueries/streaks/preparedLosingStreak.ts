import { db } from '@/db'
import { teamgames, teams } from '@/db/schema'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm'

const lost_values = db.$with('lost_values').as(
  db
    .select({
      teamId: teamgames.teamId,
      lost: teamgames.lost,
      date: teamgames.date,
      women: teamgames.women,
      lostValue:
        sql<number>`case when lost = true then 1 else 0 end`.as(
          'lost_value',
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

const summed_lost_values = db
  .$with('summed_lost_values')
  .as(
    db
      .with(lost_values)
      .select({
        teamId: lost_values.teamId,
        lost: lost_values.lost,
        date: lost_values.date,
        women: lost_values.women,
        sumLosts:
          sql<number>`sum(lost_values.lost_value) over(partition by team order by date)`.as(
            'sum_losts',
          ),
        round:
          sql<number>`row_number() over (partition by team order by date)`.as(
            'round',
          ),
      })
      .from(lost_values),
  )

const grouped_losts = db.$with('grouped_losts').as(
  db
    .with(summed_lost_values)
    .select({
      teamId: summed_lost_values.teamId,
      lost: summed_lost_values.lost,
      date: summed_lost_values.date,
      women: summed_lost_values.women,
      sumLosts: summed_lost_values.sumLosts,
      grouped: sql<number>`round - sum_losts`.as('grouped'),
    })
    .from(summed_lost_values)
    .where(eq(summed_lost_values.lost, true)),
)

const group_array = db.$with('group_array').as(
  db
    .with(grouped_losts)
    .select({
      teamId: grouped_losts.teamId,
      women: grouped_losts.women,
      maxCount:
        sql<number>`mode() within group (order by grouped_losts.grouped)`.as(
          'max_count',
        ),
      dates: sql<
        Array<string>
      >`array_agg(date order by date)`.as('dates'),
    })
    .from(grouped_losts)
    .groupBy(
      grouped_losts.grouped,
      grouped_losts.teamId,
      grouped_losts.women,
    ),
)

export const preparedLosingStreak = db
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
  .prepare('losingStreak')
