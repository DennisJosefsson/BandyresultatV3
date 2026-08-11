import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type GroupStatsReturn =
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | { status: 200; breadCrumb: string; meta: Meta }
  | undefined

export const getGroupStatsMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      group: zd.string(),
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { group, year, women },
    }): Promise<GroupStatsReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = 'Statistik'
        const title = `Bandyresultat - Statistik - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/stats?women=${women}`
        const description = `Statistik ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Enbart slutspelsmatcher denna säsong, statistiken finns under slutspel.',
            breadCrumb,
            meta,
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
            breadCrumb,
            meta,
          }
        }

        if (!seasonYear) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
            breadCrumb,
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
