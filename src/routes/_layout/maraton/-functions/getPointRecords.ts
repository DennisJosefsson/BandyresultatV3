import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { RecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getPointData } from './getPointData'

type RecordStreakReturn =
  | {
      status: 200
      points: RecordDataArrays
    }
  | undefined

export const getPointRecords = createServerFn({ method: 'GET' })
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
      const pointsData = await getPointData({ women })
      return { status: 200, points: { ...pointsData } }
    } catch (error) {
      catchError(error)
    }
  })
