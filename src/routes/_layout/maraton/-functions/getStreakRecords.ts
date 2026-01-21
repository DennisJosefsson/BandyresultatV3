import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { RecordStreakData } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getStreakData } from './getStreakData'

type RecordStreakReturn =
  | {
      status: 200
      data: RecordStreakData
    }
  | undefined

export const getStreakRecords = createServerFn({ method: 'GET' })
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
      const streakData = await getStreakData({ women })
      return { status: 200, data: { ...streakData } }
    } catch (error) {
      catchError(error)
    }
  })
