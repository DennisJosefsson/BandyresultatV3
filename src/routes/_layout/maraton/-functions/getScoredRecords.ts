import { db } from '@/db'
import { mvScoredRecords } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvScoredRecords } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type ScoredReturn =
  | {
      status: 200
      scored: MvScoredRecords
    }
  | undefined

export const getScoredRecords = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<ScoredReturn> => {
      try {
        const mvData = await db
          .select()
          .from(mvScoredRecords)
          .where(eq(mvScoredRecords.women, women))
          .then((res) => res[0])

        return {
          status: 200,
          scored: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
