import { db } from '@/db'
import { series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newSeriesObject } from '@/lib/types/serie'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

export const generatedSeries = zd.object({
  seriesArray: zd.array(newSeriesObject),
})

export const addGeneratedSeries = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(generatedSeries)
  .handler(async ({ data: { seriesArray } }) => {
    try {
      if (!seriesArray || seriesArray.length === 0) {
        throw Error('seriesArray måste ha data.')
      }
      const queries = seriesArray.map((serie) => {
        return db.insert(series).values(serie)
      })
      await Promise.all(queries)

      return { status: 200, message: 'Nya serier inlagda.' }
    } catch (error) {
      catchError(error)
    }
  })
