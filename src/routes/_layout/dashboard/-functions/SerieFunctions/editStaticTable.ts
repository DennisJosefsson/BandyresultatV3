import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { tables } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editStaticTableArray } from '@/lib/types/table'

export const editStaticTable = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(editStaticTableArray))
  .handler(async ({ data: { tableArray } }) => {
    try {
      if (tableArray.length === 0) {
        throw new Error('TableArray måste ha data.')
      }

      const queries = tableArray.map((table) => {
        const { tableId, teamName, ...rest } = table
        return db.update(tables).set(rest).where(eq(tables.tableId, tableId))
      })

      await Promise.all(queries)

      //   const sqlChunks: SQL[] = []
      //   const ids: number[] = []
      //   sqlChunks.push(sql`(case`)

      //   for (const input of tableArray) {
      //     sqlChunks.push(
      //       sql`when ${tables.tableId} = ${input.tableId} then cast(${input.bonusPoints} as integer)`,
      //     )
      //     ids.push(input.tableId)
      //   }

      //   sqlChunks.push(sql`end)`)
      //   const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '))
      //   await db
      //     .update(teamseries)
      //     .set({ bonusPoints: finalSql })
      //     .where(inArray(teamseries.teamseriesId, ids))

      return {
        status: 200,
        message: 'StaticTable uppdaterade.',
      }
    } catch (error) {
      catchError(error)
    }
  })
