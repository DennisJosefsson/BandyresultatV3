import { db } from '@/db'
import { seasons, teamgames, teams } from '@/db/schema'
import { and, asc, desc, eq, gt, inArray, or, SQL, sql } from 'drizzle-orm'

export const getStreaks = async ({ teamId }: { teamId: number }) => {
  const losingStreak = await getLosingStreaks({ teamId })
  const drawStreak = await getDrawStreaks({ teamId })
  const winStreak = await getWinStreaks({ teamId })
  const noWinStreak = await getNoWinStreaks({ teamId })
  const unbeatenStreak = await getUnbeatenStreaks({ teamId })
  const playoffStreak = await getPlayoffStreak({ teamId })
  const streakObjectsLength =
    losingStreak.length +
    noWinStreak.length +
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length
  return {
    losingStreak,
    drawStreak,
    winStreak,
    noWinStreak,
    unbeatenStreak,
    streakObjectsLength,
    playoffStreak,
  }
}

const getLosingStreaks = async ({ teamId }: { teamId: number }) => {
  const lost_values = db.$with('lost_values').as(
    db
      .select({
        teamId: teamgames.teamId,
        lost: teamgames.lost,
        date: teamgames.date,
        women: teamgames.women,
        lostValue: sql<number>`case when lost = true then 1 else 0 end`.as(
          'lost_value',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.played, true), eq(teamgames.teamId, teamId))),
  )

  const summed_lost_values = db.$with('summed_lost_values').as(
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_losts)
      .groupBy(
        grouped_losts.grouped,
        grouped_losts.teamId,
        grouped_losts.women,
      ),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      women: group_array.women,
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
    .where(gt(sql<number>`array_length(group_array.dates,1)`, 5))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}

const getDrawStreaks = async ({ teamId }: { teamId: number }) => {
  const draw_values = db.$with('draw_values').as(
    db
      .select({
        teamId: teamgames.teamId,
        draw: teamgames.draw,
        date: teamgames.date,
        women: teamgames.women,
        drawValue: sql<number>`case when draw = true then 1 else 0 end`.as(
          'draw_value',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.played, true), eq(teamgames.teamId, teamId))),
  )

  const summed_draw_values = db.$with('summed_draw_values').as(
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_draws)
      .groupBy(
        grouped_draws.grouped,
        grouped_draws.teamId,
        grouped_draws.women,
      ),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      women: group_array.women,
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
    .where(gt(sql<number>`array_length(group_array.dates,1)`, 2))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}

const getWinStreaks = async ({ teamId }: { teamId: number }) => {
  const win_values = db.$with('win_values').as(
    db
      .select({
        teamId: teamgames.teamId,
        win: teamgames.win,
        date: teamgames.date,
        women: teamgames.women,
        winValue: sql<number>`case when win = true then 1 else 0 end`.as(
          'win_value',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.played, true), eq(teamgames.teamId, teamId))),
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_wins)
      .groupBy(grouped_wins.grouped, grouped_wins.teamId, grouped_wins.women),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      women: group_array.women,
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
    .where(gt(sql<number>`array_length(group_array.dates,1)`, 5))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}

const getNoWinStreaks = async ({ teamId }: { teamId: number }) => {
  const win_values = db.$with('win_values').as(
    db
      .select({
        teamId: teamgames.teamId,
        win: teamgames.win,
        date: teamgames.date,
        women: teamgames.women,
        winValue: sql<number>`case when win = false then 1 else 0 end`.as(
          'win_value',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.played, true), eq(teamgames.teamId, teamId))),
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_wins)
      .groupBy(grouped_wins.grouped, grouped_wins.teamId, grouped_wins.women),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      women: group_array.women,
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
    .where(gt(sql<number>`array_length(group_array.dates,1)`, 5))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}

const getUnbeatenStreaks = async ({ teamId }: { teamId: number }) => {
  const lost_values = db.$with('lost_values').as(
    db
      .select({
        teamId: teamgames.teamId,
        lost: teamgames.lost,
        date: teamgames.date,
        women: teamgames.women,
        lostValue: sql<number>`case when lost = false then 1 else 0 end`.as(
          'lost_value',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.played, true), eq(teamgames.teamId, teamId))),
  )

  const summed_lost_values = db.$with('summed_lost_values').as(
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
        dates: sql<string[]>`array_agg(date order by date)`.as('dates'),
      })
      .from(grouped_losts)
      .groupBy(
        grouped_losts.grouped,
        grouped_losts.teamId,
        grouped_losts.women,
      ),
  )

  const streaks = await db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      name: teams.name as unknown as SQL<string>,
      women: group_array.women,
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
    .where(gt(sql<number>`array_length(group_array.dates,1)`, 5))
    .orderBy(desc(sql`game_count`), asc(sql`start_date`))
    .limit(3)

  return streaks
}

const getPlayoffStreak = async ({ teamId }: { teamId: number }) => {
  const season_order = db.$with('season_order').as(
    db
      .select({
        rowNum: sql<number>`dense_rank() over (order by "year")`.as('row_num'),
        seasonId: seasons.seasonId,
        year: seasons.year,
      })
      .from(seasons)
      .where(gt(seasons.seasonId, 25)),
  )

  const playoff_seasons = db.$with('playoff_seasons').as(
    db
      .selectDistinct({ seasonId: teamgames.seasonId })
      .from(teamgames)
      .where(
        and(
          eq(teamgames.teamId, teamId),
          or(
            inArray(teamgames.category, [
              'playoffseries',
              'quarter',
              'semi',
              'final',
            ]),
            inArray(teamgames.group, ['SlutspelA', 'SlutspelB']),
          ),
        ),
      ),
  )

  const selected_rows = db.$with('selected_rows').as(
    db
      .with(season_order, playoff_seasons)
      .select({
        rowNum: season_order.rowNum,
        rowPlayoff: sql<number>`row_number() over (order by row_num)`.as(
          'row_playoff',
        ),
        year: season_order.year,
      })
      .from(season_order)
      .leftJoin(
        playoff_seasons,
        eq(playoff_seasons.seasonId, season_order.seasonId),
      ),
  )

  const grouped_playoffs = db.$with('grouped_playoffs').as(
    db
      .with(selected_rows)
      .select({
        grouped: sql<number>`row_num - row_playoff`.as('grouped'),
        year: selected_rows.year,
      })
      .from(selected_rows),
  )

  const group_array = db.$with('group_array').as(
    db
      .with(grouped_playoffs)
      .select({
        maxCount: sql<number>`mode() within group (order by grouped)`.as(
          'max_count',
        ),
        years: sql`array_agg("year" order by "year")`.as('years'),
      })
      .from(grouped_playoffs)
      .groupBy(grouped_playoffs.grouped),
  )

  const streaks = await db
    .with(group_array)
    .select({
      streakLength: sql<number>`array_length(years,1)`
        .mapWith(Number)
        .as('streak_length'),
      startYear: sql<string>`years[1]`.as('start_year'),
      endYear: sql<string>`years[array_upper(years,1)]`.as('end_year'),
    })
    .from(group_array)
    .where(gt(sql<number>`array_length(years,1)`.mapWith(Number), 6))
    .orderBy(desc(sql`streak_length`), asc(sql`start_year`))

  return streaks
}
