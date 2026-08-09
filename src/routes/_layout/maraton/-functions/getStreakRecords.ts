import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { RecordStreakData } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { getStreakData } from './getStreakData'

type RecordStreakReturn =
  | {
      status: 200
      streaks: RecordStreakData
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
        const streakData = await getStreakData({ women })

        return {
          status: 200,
          streaks: { ...streakData },
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
