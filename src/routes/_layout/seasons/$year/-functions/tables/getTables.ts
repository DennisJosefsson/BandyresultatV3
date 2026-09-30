import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { SeriesTableV2 } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getSortedSeriesTables } from './getTableFunctionsV2'

type TablesReturn =
  | {
      status: 200
      serie: SeriesTableV2
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getTables = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      group: zd.string(),
      year: zd.int(),
      women: zd.boolean(),
      table: zd.enum(['all', 'home', 'away']).catch('all'),
    }),
  )
  .handler(
    async ({
      data: { group, year, women, table },
    }): Promise<TablesReturn> => {
      try {
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Inga serietabeller för den här säsongen',
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }

        const serie = await db
          .select({
            ...getTableColumns(series),
          })
          .from(series)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, series.seasonId),
          )
          .where(
            and(
              eq(seasons.women, women),
              eq(seasons.intYear, year),
              eq(series.group, group),
            ),
          )
          .then((res) => {
            if (res.length > 0) return res[0]
            else return undefined
          })

        if (!serie)
          return {
            status: 404,
            message: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
          }

        const seriesTables = await getSortedSeriesTables({
          intYear: year,
          women,
          group,
          table,
        }).then((res) => res[0])

        return {
          status: 200,
          serie: seriesTables,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
