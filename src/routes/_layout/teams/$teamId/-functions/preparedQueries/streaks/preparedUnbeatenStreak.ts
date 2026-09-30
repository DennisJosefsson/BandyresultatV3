import { db } from '@/db'
import {
  teamgames,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import { jsonAggBuildObject } from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm'

const unbeaten_values = db.$with('unbeaten_values').as(
  db
    .select({
      teamId: teamgames.teamId,
      win: teamgames.win,
      draw: teamgames.draw,
      lost: teamgames.lost,
      date: teamgames.date,
      women: teamgames.women,
      unbeatenValue:
        sql<number>`case when lost = false then 1 else 0 end`.as(
          'unbeaten_value',
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

const summed_unbeaten_values = db
  .$with('summed_unbeaten_values')
  .as(
    db
      .with(unbeaten_values)
      .select({
        teamId: unbeaten_values.teamId,
        win: unbeaten_values.win,
        draw: unbeaten_values.draw,
        lost: unbeaten_values.lost,
        date: unbeaten_values.date,
        women: unbeaten_values.women,
        sumUnbeaten:
          sql<number>`sum(unbeaten_values.unbeaten_value) over(partition by team order by date)`.as(
            'sum_unbeaten',
          ),
        round:
          sql<number>`row_number() over (partition by team order by date)`.as(
            'round',
          ),
      })
      .from(unbeaten_values),
  )

const grouped_unbeaten = db.$with('grouped_unbeaten').as(
  db
    .with(summed_unbeaten_values)
    .select({
      teamId: summed_unbeaten_values.teamId,
      lost: summed_unbeaten_values.lost,
      date: summed_unbeaten_values.date,
      women: summed_unbeaten_values.women,
      sumUnbeaten: summed_unbeaten_values.sumUnbeaten,
      grouped: sql<number>`round - sum_unbeaten`.as(
        'grouped',
      ),
    })
    .from(summed_unbeaten_values)
    .where(eq(summed_unbeaten_values.lost, false)),
)

const group_array = db.$with('group_array').as(
  db
    .with(grouped_unbeaten)
    .select({
      teamId: grouped_unbeaten.teamId,
      women: grouped_unbeaten.women,
      maxCount:
        sql<number>`mode() within group (order by grouped_unbeaten.grouped)`.as(
          'max_count',
        ),
      dates: sql<
        Array<string>
      >`array_agg(date order by date)`.as('dates'),
    })
    .from(grouped_unbeaten)
    .groupBy(
      grouped_unbeaten.grouped,
      grouped_unbeaten.teamId,
      grouped_unbeaten.women,
    ),
)

export const preparedUnbeatenStreaks = db
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
    gt(sql<number>`array_length(group_array.dates,1)`, 5),
  )
  .orderBy(desc(sql`game_count`), asc(sql`start_date`))
  .limit(3)
  .prepare('unbeatenStreak')

export const unbeatenStreaks = db
  .$with('unbeaten_streak')
  .as(
    db
      .with(group_array)
      .select({
        teamId: group_array.teamId,
        gameCount:
          sql<number>`array_length(group_array.dates,1)`.as(
            'unbeaten_streak_game_count',
          ),
        startDate: sql<string>`group_array.dates[1]`.as(
          'unbeaten_streak_start_date',
        ),
        endDate:
          sql<string>`group_array.dates[array_upper(group_array.dates,1)]`.as(
            'unbeaten_streak_end_date',
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
        gt(
          sql<number>`array_length(group_array.dates,1)`,
          5,
        ),
      )
      .orderBy(
        desc(sql`unbeaten_streak_game_count`),
        asc(sql`unbeaten_streak_end_date`),
      )
      .limit(3),
  )

export const unbeatenStreakArray = db
  .$with('unbeaten_streak_array')
  .as(
    db
      .with(unbeatenStreaks)
      .select({
        teamId: unbeatenStreaks.teamId,
        streakArray: jsonAggBuildObject<
          Array<{
            gameCount: number
            startDate: string
            endDate: string
          }>
        >(
          {
            gameCount:
              unbeatenStreaks.gameCount as unknown as SQL<number>,
            startDate:
              unbeatenStreaks.startDate as unknown as SQL<string>,
            endDate:
              unbeatenStreaks.endDate as unknown as SQL<string>,
          },
          {
            orderBy: [
              desc(unbeatenStreaks.gameCount),
              desc(unbeatenStreaks.startDate),
            ],
          },
        ).as('unbeaten_streak_array'),
      })
      .from(unbeatenStreaks)
      .groupBy(unbeatenStreaks.teamId),
  )
