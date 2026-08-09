import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type StatsMeta =
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

export const getGeneralStatsMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<StatsMeta> => {
      try {
        const breadCrumb = `Statistik`
        const title = `Bandyresultat - Statistik Elitserien - ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/records/stats?women=${women}`
        const description = `Statistik för bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
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
