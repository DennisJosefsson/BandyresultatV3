import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { newStaticTableArray } from '@/lib/types/table'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { series, tables } from '@/db/schema'
import { db } from '@/db'

export const addStaticTable = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(newStaticTableArray))
  .handler(async ({ data }) => {
    try {
      await db.insert(tables).values(data.tableArray)
      const serieId = data.tableArray[0].serieId
      await db.update(series).set({ hasStatic: true }).where(eq(series.serieId, serieId))
      return { status: 200, message: 'Tabeller inlagda.' }
    } catch (error) {
      catchError(error)
    }
  })
