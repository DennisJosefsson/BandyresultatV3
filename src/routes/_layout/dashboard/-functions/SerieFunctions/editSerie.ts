import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { editSeriesObject } from '@/lib/types/serie'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { series } from '@/db/schema'
import { db } from '@/db'

export const editSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(editSeriesObject))
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
