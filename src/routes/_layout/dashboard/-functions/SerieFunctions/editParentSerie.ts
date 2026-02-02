import { db } from '@/db'
import { parentchildseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editParentSerieObjectArray } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { inArray, SQL, sql } from 'drizzle-orm'

export const editParentSerieInput = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(editParentSerieObjectArray))
  .handler(async ({ data: { parentSeries } }) => {
    try {
      if (parentSeries.length === 0) {
        throw new Error('ParentSeriesArray måste ha data.')
      }

      const sqlChunks: SQL[] = []
      const ids: number[] = []
      sqlChunks.push(sql`(case`)

      for (const input of parentSeries) {
        sqlChunks.push(
          sql`when ${parentchildseries.id} = ${input.id} then cast(${input.parentId} as integer)`,
        )
        ids.push(input.id)
      }

      sqlChunks.push(sql`end)`)
      const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '))
      await db
        .update(parentchildseries)
        .set({ parentId: finalSql })
        .where(inArray(parentchildseries.id, ids))

      return {
        status: 200,
        message: 'ParentSerie uppdaterade.',
      }
    } catch (error) {
      catchError(error)
    }
  })
