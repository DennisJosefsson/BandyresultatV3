import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { and, asc, desc, eq, sql } from 'drizzle-orm'

const ranked = db.$with('ranked').as(
  db
    .select({
      seasonId: series.seasonId,
      year: seasons.year,
      women: seasons.women,
      group: series.group,
      rankedGroup:
        sql<number>`rank() over (partition by series.season_id order by series.serie_group_code asc)`
          .mapWith(Number)
          .as('ranked_group'),
    })
    .from(series)
    .leftJoin(
      seasons,
      eq(seasons.seasonId, series.seasonId),
    )
    .where(
      and(
        eq(series.level, 200),
        eq(series.category, 'regular'),
        eq(seasons.women, sql.placeholder('women')),
      ),
    ),
)

const extractGroup = db
  .$with('extract_group')
  .as(
    db
      .with(ranked)
      .select()
      .from(ranked)
      .where(eq(ranked.rankedGroup, 1))
      .orderBy(asc(ranked.year), asc(ranked.women)),
  )

export const preparedGroupsForPaginatedSeasons = db
  .with(ranked)
  .select()
  .from(ranked)
  .where(eq(ranked.rankedGroup, 1))
  .orderBy(asc(ranked.year), asc(ranked.women))
  .prepare('groupsForPaginatedSeasons')

export const preparedPagSeasons = db
  .with(extractGroup)
  .select({
    year: seasons.year,
    seasonId: seasons.seasonId,
    group: extractGroup.group,
  })
  .from(seasons)
  .leftJoin(
    extractGroup,
    eq(extractGroup.seasonId, seasons.seasonId),
  )
  .where(eq(seasons.women, sql.placeholder('women')))
  .offset(sql.placeholder('offset'))
  .limit(12)
  .orderBy(desc(seasons.seasonId))
  .prepare('paginatedSeasons')

// export const preparedPagSeasons = db.query.seasons
//   .findMany({
//     columns: { seasonId: true, year: true },
//     where: (seasonsSchema, { eq: equal }) =>
//       equal(seasonsSchema.women, sql.placeholder('women')),
//     offset: sql.placeholder('offset'),
//     limit: 12,
//     orderBy: (seasonsSchema, { desc }) =>
//       desc(seasonsSchema.seasonId),
//   })
//   .prepare('paginatedSeasons')
