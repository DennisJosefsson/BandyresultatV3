import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type GamesMetaReturn =
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

export const getGamesMeta = createServerFn({
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
    }): Promise<GamesMetaReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = 'Matcher'
        const title = `Bandyresultat - Matcher - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/games?women=${women}`
        const description = `Matcher ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (!seasonYear)
          return {
            status: 404,
            message: 'Säsongen finns inte.',
            breadCrumb,
            meta,
          }

        if (year < 1930) {
          return {
            status: 404,
            message:
              'Inga seriematcher inlagda denna säsong.',
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
