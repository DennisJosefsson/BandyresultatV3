import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, asc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export const page = z.number().catch(1)

export const getPaginatedSeasons = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(page))
  .handler(async ({ data }) => {
    const count = await db.$count(seasons, eq(seasons.women, false))

    const ranked = db.$with('ranked').as(
      db
        .select({
          seasonId: series.seasonId,
          year: seasons.year,
          women: seasons.women,
          group: series.serieGroupCode,
          rankedGroup:
            sql<number>`rank() over (partition by series.season_id, seasons.women order by series.serie_group_code)`
              .mapWith(Number)
              .as('ranked_group'),
        })
        .from(series)
        .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
        .where(and(eq(series.level, 1), eq(series.serieCategory, 'regular'))),
    )

    const groups = await db
      .with(ranked)
      .select()
      .from(ranked)
      .where(eq(ranked.rankedGroup, 1))
      .orderBy(asc(ranked.year), asc(ranked.women))

    const pagSeasons = await db.query.seasons.findMany({
      columns: { seasonId: true, year: true },
      where: (seasons, { eq }) => eq(seasons.women, false),
      offset: (data - 1) * 12,
      limit: 12,
      orderBy: (seasons, { desc }) => desc(seasons.seasonId),
    })

    const combinedSeasons = pagSeasons.map((s) => {
      const mensGroup = groups.find(
        (g) => g.year === s.year && g.women === false,
      )
      const womensGroup = groups.find(
        (g) => g.year === s.year && g.women === true,
      )
      return {
        ...s,
        mensGroup: mensGroup?.group ?? undefined,
        womensGroup: womensGroup?.group ?? undefined,
      }
    })

    return { count, seasons: combinedSeasons }
  })
