import { db } from '@/db'
import { mvConcededRecords } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvConcededRecords } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type ConcededReturn =
  | {
      status: 200
      conceded: MvConcededRecords
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
        const mvData = await db
          .select()
          .from(mvConcededRecords)
          .where(eq(mvConcededRecords.women, women))
          .then((res) => res[0])

        return {
          status: 200,
          conceded: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
