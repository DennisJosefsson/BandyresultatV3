import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Serie } from '@/lib/types/serie'
import { TeamTable } from '@/lib/types/table'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getUnionedTables } from './getTableFunctions'

type TablesReturn =
  | {
      status: 200
      tables: Omit<TeamTable, 'women' | 'group' | 'season'>[]
      serie: Serie
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getTables = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        group: zd.string(),
        year: zd.int(),
        women: zd.boolean(),
        table: zd.enum(['all', 'home', 'away']).catch('all'),
      }),
    ),
  )
  .handler(
    async ({ data: { group, year, women, table } }): Promise<TablesReturn> => {
      try {
        if (year < 1930) {
          return {
            status: 404,
            message: 'Inga serietabeller för den här säsongen',
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message: 'Damernas första säsong var 1972/1973.',
          }
        }
        const seasonYear = seasonIdCheck.parse(year)
        if (!seasonYear) {
          return { status: 404, message: 'Säsongen finns inte.' }
        }

        const serie = await db
          .select({
            ...getTableColumns(series),
          })
          .from(series)
          .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
          .where(
            and(
              eq(seasons.women, women),
              eq(seasons.year, seasonYear),
              eq(series.group, group),
            ),
          )
          .then((res) => {
            if (res.length > 0) return res[0]
            else return undefined
          })

        if (!serie) return { status: 404, message: 'Serien finns inte.' }

        const results = await getUnionedTables({ serie, table })

        return { status: 200, tables: results, serie }
      } catch (error) {
        catchError(error)
      }
    },
  )
