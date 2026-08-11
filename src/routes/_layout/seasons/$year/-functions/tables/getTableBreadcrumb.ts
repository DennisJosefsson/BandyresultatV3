import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type TablesReturn =
  | {
      status: 200
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 404
      breadCrumb: string
      meta: Meta
    }
  | undefined

export const getTableMeta = createServerFn({
  method: 'GET',
})
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
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb =
          table === 'all'
            ? 'Tabell'
            : table === 'home'
              ? 'Hemmatabell'
              : 'Bortatabell'
        const title = `Bandyresultat - ${breadCrumb} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/tables/${table}?women=${women}`
        const description = `Serietabeller ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (!seasonYear) {
          return {
            status: 404,
            breadCrumb: 'Tabell',
            meta,
          }
        }
        if (year < 1930) {
          return {
            status: 404,
            breadCrumb: 'Tabell',
            meta,
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            breadCrumb: 'Tabell',
            meta,
          }
        }

        return {
          status: 200,
          breadCrumb,
          meta,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
