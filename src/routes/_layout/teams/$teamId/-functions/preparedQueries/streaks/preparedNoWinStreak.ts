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
import {
  and,
  asc,
  desc,
  eq,
  gt,
  isNotNull,
  sql,
} from 'drizzle-orm'

const win_values = db.$with('win_values').as(
  db
    .select({
      teamId: teamgames.teamId,
      win: teamgames.win,
      date: teamgames.date,
      women: teamgames.women,
      winValue:
        sql<number>`case when lost = true or draw = true then 1 else 0 end`.as(
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
    .where(eq(summed_win_values.win, false)),
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

export const preparedNoWinStreaks = db
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
  .prepare('noWinStreak')

export const noWinStreaks = db.$with('nowin_streaks').as(
  db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      gameCount:
        sql<number>`array_length(group_array.dates,1)`.as(
          'nowin_streak_game_count',
        ),
      startDate: sql<string>`group_array.dates[1]`.as(
        'nowin_streak_start_date',
      ),
      endDate:
        sql<string>`group_array.dates[array_upper(group_array.dates,1)]`.as(
          'nowin_streak_end_date',
        ),
    })
    .from(group_array)
    .where(
      gt(sql<number>`array_length(group_array.dates,1)`, 5),
    )
    .orderBy(
      desc(sql`nowin_streak_game_count`),
      asc(sql`nowin_streak_end_date`),
    )
    .limit(3),
)

export const noWinStreakArray = db
  .$with('no_win_streak_array')
  .as(
    db
      .with(noWinStreaks)
      .select({
        teamId: noWinStreaks.teamId,
        streakArray: jsonAggBuildObject<
          Array<{
            gameCount: number
            startDate: string
            endDate: string
          }>
        >(
          {
            gameCount:
              noWinStreaks.gameCount as unknown as SQL<number>,
            startDate:
              noWinStreaks.startDate as unknown as SQL<string>,
            endDate:
              noWinStreaks.endDate as unknown as SQL<string>,
          },
          {
            orderBy: [
              desc(noWinStreaks.gameCount),
              desc(noWinStreaks.startDate),
            ],
            filter: isNotNull(noWinStreaks.gameCount),
          },
        ).as('noWin_streak_array'),
      })
      .from(noWinStreaks)
      .groupBy(noWinStreaks.teamId),
  )
