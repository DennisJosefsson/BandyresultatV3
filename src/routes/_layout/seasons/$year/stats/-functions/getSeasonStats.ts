import { db } from '@/db'
import { mvSeasonStats } from '@/db/views/seasonStatsViews'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvSeasonStats } from '@/lib/types/stats'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

type ReturnStats =
  | { status: 200; stats: MvSeasonStats }
  | { status: 404; message: string }
  | undefined

export const getSeasonStats = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ intYear: zd.int(), women: zd.boolean() }),
  )
  .handler(
    async ({
      data: { intYear, women },
    }): Promise<ReturnStats> => {
      try {
        const seasonStats = await db
          .select()
          .from(mvSeasonStats)
          .where(
            and(
              eq(mvSeasonStats.intYear, intYear),
              eq(mvSeasonStats.women, women),
            ),
          )
          .then((res) => res[0])

        const everyNull = Object.values(
          seasonStats.allStats,
        ).every((val) => val === null)

        if (everyNull) {
          throw new Error404({
            message: 'Ingen statistik för säsongen.',
          })
        }

        return { status: 200, stats: seasonStats }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
