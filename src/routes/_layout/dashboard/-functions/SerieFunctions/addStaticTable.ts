import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { series, tables } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newStaticTableArray } from '@/lib/types/table'

export const addStaticTable = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(newStaticTableArray))
  .handler(async ({ data }) => {
    try {
      await db.insert(tables).values(data.tableArray)
      const serieId = data.tableArray[0].serieId
      await db
        .update(series)
        .set({ hasStatic: true })
        .where(eq(series.serieId, serieId))
      return { status: 200, message: 'Tabeller inlagda.' }
    } catch (error) {
      catchError(error)
    }
  })
