import { db } from '@/db'
import { mvTeamStreakRecords } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvTeamStreakRecords } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type RecordStreakReturn =
  | {
      status: 200
      streaks: MvTeamStreakRecords
    }
  | undefined

export const getStreakRecords = createServerFn({
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
          .from(mvTeamStreakRecords)
          .where(eq(mvTeamStreakRecords.women, women))
          .then((res) => res[0])

        return {
          status: 200,
          streaks: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
