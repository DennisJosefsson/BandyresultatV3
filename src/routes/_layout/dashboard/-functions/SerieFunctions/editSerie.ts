import { db } from '@/db'
import { series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editSeriesObject } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const editSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(editSeriesObject)
  .handler(async ({ data }) => {
    try {
      const editSerie = await db
        .update(series)
        .set(data)
        .where(eq(series.serieId, data.serieId))
        .returning()
        .then((res) => res[0])

      return {
        status: 200,
        message: `${editSerie.serieName} uppdaterad.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
