import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { GeneratStats } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { getGeneralStatsData } from './getGeneralStatsData'

type RecordStreakReturn =
  | {
      status: 200
      generalStats: GeneratStats
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
        const generalStatsData = await getGeneralStatsData({
          women,
        })

        return {
          status: 200,
          generalStats: { ...generalStatsData },
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
