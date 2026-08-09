import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type StreakMeta =
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

export const getStreakMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({ data: { women } }): Promise<StreakMeta> => {
      try {
        const breadCrumb = `Sviter`
        const title = `Bandyresultat - Sviter - ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/records/streaks?women=${women}`
        const description = `Rekordsviter i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
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
