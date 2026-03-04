import { createServerFn } from '@tanstack/react-start'

import { db } from '@/db'

export const getSeasons = createServerFn({
  method: 'GET',
}).handler(async () => {
  const seasons = await db.query.seasons.findMany({
    orderBy: (seasonsSchema, { desc }) => [
      desc(seasonsSchema.seasonId),
    ],
  })
  return seasons
})
