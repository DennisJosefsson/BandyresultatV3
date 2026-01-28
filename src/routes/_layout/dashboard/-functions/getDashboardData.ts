import { db } from '@/db'
import { games, seasons } from '@/db/schema'

import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq, getTableColumns, lt } from 'drizzle-orm'

export const getDashboardData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const today = new Date().toLocaleDateString('se-SV', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const todaysUnplayedGamesCount = await db.$count(
      games,
      and(eq(games.date, today), eq(games.played, false)),
    )

    const earlierUnplayedGamesCount = await db.$count(
      games,
      and(lt(games.date, today), eq(games.played, false)),
    )

    const lastSeasons = await db
      .select({ ...getTableColumns(seasons) })
      .from(seasons)
      .where(
        eq(
          seasons.year,
          db
            .select({ year: seasons.year })
            .from(seasons)
            .orderBy(desc(seasons.seasonId))
            .limit(1),
        ),
      )

    return { lastSeasons, todaysUnplayedGamesCount, earlierUnplayedGamesCount }
  },
)
