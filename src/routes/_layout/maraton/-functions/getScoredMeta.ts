import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type ScoredMeta =
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

export const getScoredMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<ScoredMeta> => {
      try {
        const breadCrumb = `Gjorda mål`
        const title = `Bandyresultat - Rekord gjorda mål - ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/records/scored?women=${women}`
        const description = `Rekord i antalet gjorda mål i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
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
