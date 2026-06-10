import { desc, eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { series } from '@/db/schema'
import { db } from '@/db'

export const getSeriesForSeriesForm = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(zodValidator(zd.object({ seasonId: zd.number().positive().int() })))
  .handler(async ({ data: { seasonId } }) => {
    try {
      const getSeries = await db
        .select({
          value: series.serieId,
          label: series.serieName,
        })
        .from(series)
        .where(eq(series.seasonId, seasonId))
        .orderBy(desc(series.level))

      return { status: 200, series: getSeries }
    } catch (error) {
      catchError(error)
    }
  })
