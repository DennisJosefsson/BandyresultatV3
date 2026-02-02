import { db } from '@/db'
import { series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { desc, eq } from 'drizzle-orm'

export const getSeriesForSeriesForm = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ seasonId: zd.number().positive().int() })),
  )
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
