import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type DevDataReturn =
  | {
      status: 200
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

export const getDevAndIntMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      group: zd.string(),
      year: zd.int(),
      women: zd.boolean(),
      origin: zd.enum(['interval', 'development']),
    }),
  )
  .handler(
    async ({
      data: { group, year, women, origin },
    }): Promise<DevDataReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb =
          origin === 'development'
            ? 'Utveckling'
            : 'Intervall'

        const title =
          origin === 'development'
            ? `Bandyresultat - Utveckling - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
            : `Bandyresultat - Intervall - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url =
          origin === 'development'
            ? `https://bandyresultat.se/seasons/${year}/${group}/development?women=${women}`
            : `https://bandyresultat.se/seasons/${year}/${group}/interval?women=${women}`
        const description =
          origin === 'development'
            ? `Utvecklingen omgång för omgång ${seasonYear}`
            : `Utvecklingen mellan olika omgångar ${seasonYear}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Inga serietabeller för den här säsongen',
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
