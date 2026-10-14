import { db } from '@/db'
import { mvPlayoffStats } from '@/db/views/seasonStatsViews'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvPlayoffStats } from '@/lib/types/stats'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

type GroupStatsReturn =
  | {
      status: 404
      message: string
    }
  | { status: 200; stats: MvPlayoffStats }
  | undefined

export const getPlayoffStats = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<GroupStatsReturn> => {
      try {
        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }

        const playoffStats = await db
          .select()
          .from(mvPlayoffStats)
          .where(
            and(
              eq(mvPlayoffStats.intYear, year),
              eq(mvPlayoffStats.women, women),
            ),
          )
          .then((res) => res[0])

        const everyNull = Object.values(
          playoffStats.allStats,
        ).every((val) => val === null)

        if (everyNull) {
          throw new Error404({
            message: 'Ingen statistik för slutspelet.',
          })
        }

        return {
          status: 200,
          stats: playoffStats,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
