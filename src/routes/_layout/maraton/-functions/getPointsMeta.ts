import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type PointsMetaReturn =
  | {
      status: 200
      breadCrumb: string
      meta: {
        title: string
        url: string
        description: string
      }
    }
  | undefined

export const getPointsMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { women },
    }): Promise<PointsMetaReturn> => {
      try {
        const breadCrumb = `Poäng`
        const title = `Bandyresultat - Poängrekord - ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/records/points?women=${women}`
        const description = `Poängrekord i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
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
