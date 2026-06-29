import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { and, asc, eq, sql } from 'drizzle-orm'

const ranked = db.$with('ranked').as(
  db
    .select({
      seasonId: series.seasonId,
      year: seasons.year,
      women: seasons.women,
      group: series.group,
      rankedGroup:
        sql<number>`rank() over (partition by series.season_id, seasons.women order by series.serie_group_code)`
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
        eq(series.level, 1),
        eq(series.category, 'regular'),
      ),
    ),
)

export const preparedGroupsForPaginatedSeasons = db
  .with(ranked)
  .select()
  .from(ranked)
  .where(eq(ranked.rankedGroup, 1))
  .orderBy(asc(ranked.year), asc(ranked.women))
  .prepare('groupsForPaginatedSeasons')

export const preparedPagSeasons = db.query.seasons
  .findMany({
    columns: { seasonId: true, year: true },
    where: (seasonsSchema, { eq: equal }) =>
      equal(seasonsSchema.women, false),
    offset: sql.placeholder('offset'),
    limit: 12,
    orderBy: (seasonsSchema, { desc }) =>
      desc(seasonsSchema.seasonId),
  })
  .prepare('paginatedSeasons')
