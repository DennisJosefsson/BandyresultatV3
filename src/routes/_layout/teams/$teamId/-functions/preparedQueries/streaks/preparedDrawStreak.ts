import { db } from '@/db'
import {
  teamgames,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm'

const draw_values = db.$with('draw_values').as(
  db
    .select({
      teamId: teamgames.teamId,
      draw: teamgames.draw,
      date: teamgames.date,
      women: teamgames.women,
      drawValue:
        sql<number>`case when draw = true then 1 else 0 end`.as(
          'draw_value',
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

const summed_draw_values = db
  .$with('summed_draw_values')
  .as(
    db
      .with(draw_values)
      .select({
        teamId: draw_values.teamId,
        draw: draw_values.draw,
        date: draw_values.date,
        women: draw_values.women,
        sumdraws:
          sql<number>`sum(draw_values.draw_value) over(partition by team order by date)`.as(
            'sum_draws',
          ),
        round:
          sql<number>`row_number() over (partition by team order by date)`.as(
            'round',
          ),
      })
      .from(draw_values),
  )

const grouped_draws = db.$with('grouped_draws').as(
  db
    .with(summed_draw_values)
    .select({
      teamId: summed_draw_values.teamId,
      draw: summed_draw_values.draw,
      date: summed_draw_values.date,
      women: summed_draw_values.women,
      sumdraws: summed_draw_values.sumdraws,
      grouped: sql<number>`round - sum_draws`.as('grouped'),
    })
    .from(summed_draw_values)
    .where(eq(summed_draw_values.draw, true)),
)

const group_array = db.$with('group_array').as(
  db
    .with(grouped_draws)
    .select({
      teamId: grouped_draws.teamId,
      women: grouped_draws.women,
      maxCount:
        sql<number>`mode() within group (order by grouped_draws.grouped)`.as(
          'max_count',
        ),
      dates: sql<
        Array<string>
      >`array_agg(date order by date)`.as('dates'),
    })
    .from(grouped_draws)
    .groupBy(
      grouped_draws.grouped,
      grouped_draws.teamId,
      grouped_draws.women,
    ),
)

export const preparedDrawStreaks = db
  .with(group_array)
  .select({
    team: {
      teamId: group_array.teamId,
      name: teamnames.name,
      shortName: teamnames.shortName,
      casualName: teamnames.casualName,
      logo: {
        logoId: teamlogos.logoId,
        hasDark: teamlogos.hasDark,
      },
    } as unknown as SQL<TeamBaseWithLogo>,
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
  .leftJoin(
    teamnames,
    eq(teamnames.teamnameId, teams.teamnameId),
  )
  .leftJoin(
    teamlogos,
    eq(teamlogos.logoId, teamnames.logoId),
  )
  .where(
    gt(sql<number>`array_length(group_array.dates,1)`, 2),
  )
  .orderBy(desc(sql`game_count`), asc(sql`start_date`))
  .limit(3)
  .prepare('drawStreaks')
