import { db } from '@/db'
import { seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { max, min } from 'drizzle-orm'

export const getFirstAndLastSeason = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const seasonObject = await db
        .select({
          firstSeason: min(seasons.intYear),
          lastSeason: max(seasons.intYear),
        })
        .from(seasons)
        .then((res) => {
          const object = res[0]

          if (!object.lastSeason || !object.firstSeason) {
            throw new Error('Säsongsdata saknas')
          }

          return {
            lastSeason: object.lastSeason,
            firstSeason: object.firstSeason,
          }
        })

      return { ...seasonObject }
    } catch (error) {
      catchError(error)
    }
  })
