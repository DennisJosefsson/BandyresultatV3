import { db } from '@/db'
import { seasons, series, teamgames } from '@/db/schema'
import { jsonAggBuildObject } from '@/lib/drizzleHelpers/jsonAggjsonBuildObject'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  isNotNull,
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
    .where(gte(seasons.intYear, 1931)),
)

const playoff_seasons = db.$with('playoff_seasons').as(
  db
    .selectDistinct({
      seasonId: teamgames.seasonId,
      teamId: teamgames.teamId,
    })
    .from(teamgames)
    .leftJoin(series, eq(series.serieId, teamgames.serieId))
    .leftJoin(
      seasons,
      eq(seasons.seasonId, teamgames.seasonId),
    )
    .where(
      and(
        gte(seasons.intYear, 1931),
        eq(teamgames.teamId, sql.placeholder('teamId')),
        inArray(series.category, [
          'playoffseries',
          'quarter',
          'semi',
          'final',
        ]),
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
      teamId: playoff_seasons.teamId,
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
      teamId: selected_rows.teamId,
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
      years:
        sql`array_agg(grouped_playoffs."year" order by "year")`.as(
          'years',
        ),
      teamId: grouped_playoffs.teamId,
    })
    .from(grouped_playoffs)
    .groupBy(
      grouped_playoffs.grouped,
      grouped_playoffs.teamId,
    ),
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
    years: group_array.years,
    teamId: group_array.teamId,
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

const playoffStreaks = db.$with('playoff_streaks').as(
  db
    .with(group_array)
    .select({
      teamId: group_array.teamId,
      streakLength: sql<number>`array_length(years,1)`
        .mapWith(Number)
        .as('streak_length'),
      startYear: sql<string>`years[1]`.as('start_year'),
      endYear: sql<string>`years[array_upper(years,1)]`.as(
        'end_year',
      ),
      years: group_array.years,
    })
    .from(group_array)
    .where(
      gt(
        sql<number>`array_length(years,1)`.mapWith(Number),
        6,
      ),
    ),
)

export const playoffStreakArray = db
  .$with('playoff_streak_array')
  .as(
    db
      .with(playoffStreaks)
      .select({
        teamId: playoffStreaks.teamId,
        streakArray: jsonAggBuildObject<
          Array<{
            streakLength: number
            startYear: string
            endYear: string
            years: Array<string>
          }>
        >(
          {
            streakLength:
              playoffStreaks.streakLength as unknown as SQL<number>,
            startYear:
              playoffStreaks.startYear as unknown as SQL<string>,
            endYear:
              playoffStreaks.endYear as unknown as SQL<string>,
            years: playoffStreaks.years as unknown as SQL<
              Array<string>
            >,
          },
          {
            orderBy: [
              desc(playoffStreaks.streakLength),
              desc(playoffStreaks.startYear),
            ],
            filter: isNotNull(playoffStreaks.streakLength),
          },
        ).as('playoff_streak_array'),
      })
      .from(playoffStreaks)
      .groupBy(playoffStreaks.teamId),
  )
