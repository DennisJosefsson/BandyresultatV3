import { db } from '@/db'
import { competitions, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { desc, eq, getTableColumns } from 'drizzle-orm'

export const getSeriesForSeriesForm = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      seasonId: zd.number().positive().int(),
      competitionId: zd.number().positive().int(),
    }),
  )
  .handler(
    async ({ data: { seasonId, competitionId } }) => {
      try {
        const getSeries = await db
          .select({
            value: series.serieId,
            label: series.serieName,
          })
          .from(series)
          .where(eq(series.seasonId, seasonId))
          .orderBy(desc(series.level))

        const competition = await db
          .select({ ...getTableColumns(competitions) })
          .from(competitions)
          .where(
            eq(competitions.competitionId, competitionId),
          )
          .then((res) => {
            if (res.length === 0) return null
            return res[0]
          })

        if (!competition)
          throw new Error('Turneringar saknas')

        return {
          status: 200,
          series: getSeries,
          competition,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
