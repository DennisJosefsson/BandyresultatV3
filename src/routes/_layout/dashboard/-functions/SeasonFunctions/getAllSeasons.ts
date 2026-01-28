import { db } from '@/db'
import { seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { asc, desc, getTableColumns } from 'drizzle-orm'

export const getAllSeasons = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const seasonArray = await db
        .select({ ...getTableColumns(seasons) })
        .from(seasons)
        .orderBy(desc(seasons.year), asc(seasons.women))

      return seasonArray
    } catch (error) {
      catchError(error)
    }
  })
