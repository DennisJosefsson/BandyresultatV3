import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Meta } from '@/lib/types/meta'
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
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
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
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb =
          table === 'all'
            ? 'Tabell'
            : table === 'home'
              ? 'Hemmatabell'
              : 'Bortatabell'
        const title = `Bandyresultat - ${breadCrumb} - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/tables/${table}?women=${women}`
        const description = `Serietabeller ${group} ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (!seasonYear) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
            breadCrumb: 'Tabell',
            meta,
          }
        }
        if (year < 1930) {
          return {
            status: 404,
            message: 'Inga serietabeller för den här säsongen',
            breadCrumb: 'Tabell',
            meta,
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message: 'Damernas första säsong var 1972/1973.',
            breadCrumb: 'Tabell',
            meta,
          }
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

        if (!serie)
          return {
            status: 404,
            message: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
            breadCrumb,
            meta,
          }

        const results = await getUnionedTables({ serie, table })

        return { status: 200, tables: results, serie, breadCrumb, meta }
      } catch (error) {
        catchError(error)
      }
    },
  )
