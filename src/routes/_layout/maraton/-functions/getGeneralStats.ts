import { db } from '@/db'
import { mvGeneralStats } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvGeneralStats } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type RecordStreakReturn =
  | {
      status: 200
      generalStats: MvGeneralStats
    }
  | undefined

export const getGeneralStats = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { women },
    }): Promise<RecordStreakReturn> => {
      try {
        const mvData = await db
          .select()
          .from(mvGeneralStats)
          .where(eq(mvGeneralStats.women, women))
          .then((res) => res[0])

        return {
          status: 200,
          generalStats: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
