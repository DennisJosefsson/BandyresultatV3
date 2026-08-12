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

export const getPlayoffStatsMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<GroupStatsReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = `Statistik`
        const title = `Bandyresultat - Statistik slutspelsmatcher - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/playoff/stats?women=${women}`
        const description = `Statistik slutspelsmatcher säsongen ${seasonYear} för ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
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
