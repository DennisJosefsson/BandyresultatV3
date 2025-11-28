import { db } from '@/db'
import { createServerFn } from '@tanstack/react-start'

export const getSeasons = createServerFn({ method: 'GET' }).handler(
  async () => {
    const seasons = await db.query.seasons.findMany({
      orderBy: (seasons, { desc }) => [desc(seasons.seasonId)],
    })
    return seasons
  },
)
