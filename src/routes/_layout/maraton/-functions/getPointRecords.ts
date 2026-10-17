import { db } from '@/db'
import { mvPointsRecords } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvPointsRecords } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

type PointsReturn =
  | {
      status: 200
      points: MvPointsRecords
    }
  | undefined

export const getPointRecords = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<PointsReturn> => {
      try {
        const mvData = await db
          .select()
          .from(mvPointsRecords)
          .where(eq(mvPointsRecords.women, women))
          .then((res) => res[0])

        return {
          status: 200,
          points: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
