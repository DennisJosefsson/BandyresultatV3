import { db } from '@/db'
import { seasons, teamgames } from '@/db/schema'
import {
  and,
  asc,
  desc,
  eq,
  gt,
  inArray,
  or,
  sql,
} from 'drizzle-orm'

const season_order = db.$with('season_order').as(
  db
    .select({
      rowNum:
        sql<number>`dense_rank() over (order by "year")`.as(
          'row_num',
        ),
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
        eq(teamgames.teamId, sql.placeholder('teamId')),
        or(
          inArray(teamgames.category, [
            'playoffseries',
            'quarter',
            'semi',
            'final',
          ]),
          inArray(teamgames.group, [
            'SlutspelA',
            'SlutspelB',
          ]),
        ),
      ),
    ),
)

const selected_rows = db.$with('selected_rows').as(
  db
    .with(season_order, playoff_seasons)
    .select({
      rowNum: season_order.rowNum,
      rowPlayoff:
        sql<number>`row_number() over (order by row_num)`.as(
          'row_playoff',
        ),
      year: season_order.year,
    })
    .from(playoff_seasons)
    .leftJoin(
      season_order,
      eq(playoff_seasons.seasonId, season_order.seasonId),
    ),
)

const grouped_playoffs = db.$with('grouped_playoffs').as(
  db
    .with(selected_rows)
    .select({
      grouped: sql<number>`row_num - row_playoff`.as(
        'grouped',
      ),
      year: selected_rows.year,
    })
    .from(selected_rows),
)

const group_array = db.$with('group_array').as(
  db
    .with(grouped_playoffs)
    .select({
      maxCount:
        sql<number>`mode() within group (order by grouped)`.as(
          'max_count',
        ),
      years: sql`array_agg("year" order by "year")`.as(
        'years',
      ),
    })
    .from(grouped_playoffs)
    .groupBy(grouped_playoffs.grouped),
)

export const preparedPlayoffStreaks = db
  .with(group_array)
  .select({
    streakLength: sql<number>`array_length(years,1)`
      .mapWith(Number)
      .as('streak_length'),
    startYear: sql<string>`years[1]`.as('start_year'),
    endYear: sql<string>`years[array_upper(years,1)]`.as(
      'end_year',
    ),
  })
  .from(group_array)
  .where(
    gt(
      sql<number>`array_length(years,1)`.mapWith(Number),
      6,
    ),
  )
  .orderBy(desc(sql`streak_length`), asc(sql`start_year`))
  .prepare('playoffStreaks')
