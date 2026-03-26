import { createServerFn } from '@tanstack/react-start'

import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'

export const getSeasons = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const seasons = await db.query.seasons.findMany({
      orderBy: (seasonsSchema, { desc }) => [
        desc(seasonsSchema.seasonId),
      ],
    })
    return seasons
  } catch (error) {
    catchError(error)
  }
})
