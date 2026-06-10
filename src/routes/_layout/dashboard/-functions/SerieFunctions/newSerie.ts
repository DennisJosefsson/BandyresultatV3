import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { newSeriesObject } from '@/lib/types/serie'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { series } from '@/db/schema'
import { db } from '@/db'

export const newSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(newSeriesObject))
  .handler(async ({ data }) => {
    try {
      const newSerie = await db
        .insert(series)
        .values(data)
        .returning()
        .then((res) => res[0])

      return {
        status: 200,
        message: `Ny serie ${newSerie.serieName} inlagd.`,
        serieId: newSerie.serieId,
      }
    } catch (error) {
      catchError(error)
    }
  })
