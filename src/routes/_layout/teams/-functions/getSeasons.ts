import { createServerFn } from '@tanstack/react-start'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { db } from '@/db'

export const getSeasons = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const seasons = await db.query.seasons.findMany({
      orderBy: (seasonsSchema, { desc }) => [desc(seasonsSchema.seasonId)],
    })
    return seasons
  } catch (error) {
    catchError(error)
  }
})
