import { db } from '@/db'
import { competitions, seasons } from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { SeriesTableV2 } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'
import {
  getSortedCupSeriesTables,
  getSortedCupSeriesTablesV2,
} from './cupQueries'

type CupTablesReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
      tables: Array<SeriesTableV2>
      tableLength: number
    }
  | { status: 404; message: string }
  | undefined

export const getCupSeriesTables = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      competitionName: zd
        .string()
        .transform((val) => val.replaceAll('_', ' ')),
      seasonYear: zd.string(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { competitionName, seasonYear, women },
    }): Promise<CupTablesReturn> => {
      try {
        const season = await db
          .select({ ...getTableColumns(seasons) })
          .from(seasons)
          .where(
            and(
              eq(seasons.year, seasonYear),
              eq(seasons.women, women),
            ),
          )
          .then((res) => {
            if (res.length === 0) return undefined
            return res[0]
          })

        if (!season) {
          throw new Error404({
            message: 'Säsongen finns inte.',
          })
        }

        const competition = await db
          .select()
          .from(competitions)
          .where(
            and(
              eq(
                competitions.competitionName,
                competitionName,
              ),
              eq(competitions.seasonId, season.seasonId),
              eq(competitions.isCup, true),
            ),
          )
          .then((res) => {
            if (res.length === 0) return undefined
            return res[0]
          })

        if (!competition) {
          throw new Error404({
            message: 'Cupen finns inte.',
          })
        }

        const tables = await getSortedCupSeriesTables({
          competitionName,
          seasonYear: season.intYear,
          women,
        })

        const tablesV2 = await getSortedCupSeriesTablesV2({
          competitionName,
          seasonYear: season.intYear,
          women,
        })

        const tableLength = tables.reduce(
          (acc, curr) => acc + curr.tableArray.length,
          0,
        )

        return {
          status: 200,
          competition,
          tables: tablesV2,
          tableLength,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
