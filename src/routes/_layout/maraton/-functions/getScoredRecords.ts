import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { GoalRecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getScoredData } from './getScoredData'

type RecordStreakReturn =
  | {
      status: 200
      scored: GoalRecordDataArrays
    }
  | undefined

export const getScoredRecords = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        women: zd.boolean(),
      }),
    ),
  )
  .handler(async ({ data: { women } }): Promise<RecordStreakReturn> => {
    try {
      const scoredData = await getScoredData({ women })
      return { status: 200, scored: { ...scoredData } }
    } catch (error) {
      catchError(error)
    }
  })
