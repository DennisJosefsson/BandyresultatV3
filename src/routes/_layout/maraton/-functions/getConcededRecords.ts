import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { RecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { getConcededData } from './getConcededData'

type ConcededReturn =
  | {
      status: 200
      conceded: RecordDataArrays
    }
  | undefined

export const getConcededRecords = createServerFn({
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
    }): Promise<ConcededReturn> => {
      try {
        const concededData = await getConcededData({
          women,
        })

        return {
          status: 200,
          conceded: { ...concededData },
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
