import { db } from '@/db'
import { mvMaratonTable } from '@/db/views/maratonAndRecordViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { MvMaratonTables } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

type TablesReturn =
  | {
      status: 200
      tables: MvMaratonTables
    }
  | undefined

export const getMaratonTables = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<TablesReturn> => {
      try {
        const mvData = await db
          .select()
          .from(mvMaratonTable)
          .where(and(eq(mvMaratonTable.women, women)))
          .then((res) => res[0])

        return {
          status: 200,
          tables: mvData,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
