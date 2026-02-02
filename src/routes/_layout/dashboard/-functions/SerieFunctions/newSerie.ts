import { db } from '@/db'
import { series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newSeriesObject } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'

export const newSerieInput = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(newSeriesObject))
  .handler(async ({ data }) => {
    try {
      const newSerie = await db
        .insert(series)
        .values(data)
        .returning()
        .then((res) => res[0])

      return { status: 200, message: `Ny serie ${newSerie.serieName} inlagd.` }
    } catch (error) {
      catchError(error)
    }
  })
