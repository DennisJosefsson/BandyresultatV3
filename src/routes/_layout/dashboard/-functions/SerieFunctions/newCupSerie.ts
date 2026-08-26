import { db } from '@/db'
import { series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newCupSeriesObject } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'

export const newCupSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(newCupSeriesObject)
  .handler(async ({ data }) => {
    try {
      const newSerie = await db
        .insert(series)
        .values(data)
        .returning()
        .then((res) => res[0])

      return {
        status: 200,
        message: `Ny cupserie ${newSerie.serieName} inlagd.`,
        serieId: newSerie.serieId,
      }
    } catch (error) {
      catchError(error)
    }
  })
