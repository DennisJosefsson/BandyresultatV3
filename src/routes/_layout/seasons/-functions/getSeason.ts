import { db } from '@/db'
import { seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

export const getSeason = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
      year: zd.number(),
    }),
  )
  .handler(async ({ data: { women, year } }) => {
    try {
      const season = await db
        .select()
        .from(seasons)
        .where(
          and(
            eq(seasons.women, women),
            eq(seasons.intYear, year),
          ),
        )
        .then((res) => {
          if (res.length === 0) return undefined

          return res[0]
        })

      return season
    } catch (error) {
      catchError(error)
    }
  })
