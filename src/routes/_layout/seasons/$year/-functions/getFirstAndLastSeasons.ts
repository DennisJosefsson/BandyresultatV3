import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'

export const getFirstAndLastSeason = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const firstSeason = await db.query.seasons
        .findFirst({
          columns: { year: true },
          where: (seasons, { eq }) =>
            eq(seasons.women, false),
          orderBy: (seasons, { asc }) =>
            asc(seasons.seasonId),
        })
        .then((s) => {
          if (!s) throw new Error('Ingen första-säsong!')
          return Number(s.year)
        })

      const lastSeason = await db.query.seasons
        .findFirst({
          columns: { year: true },
          where: (seasons, { eq }) =>
            eq(seasons.women, false),
          orderBy: (seasons, { desc }) =>
            desc(seasons.seasonId),
        })
        .then((s) => {
          if (!s) throw new Error('Ingen sista-säsong!')
          return Number(s.year.split('/')[1])
        })
      return { firstSeason, lastSeason }
    } catch (error) {
      catchError(error)
    }
  })
