import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type ConcededMeta =
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

export const getConcededMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<ConcededMeta> => {
      try {
        const breadCrumb = `Insläppta mål`
        const title = `Bandyresultat - Rekord insläppta mål - ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/records/conceded?women=${women}`
        const description = `Rekord i antalet insläppta mål i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
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
