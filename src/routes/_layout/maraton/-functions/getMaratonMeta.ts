import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type TablesReturn =
  | {
      status: 200
      breadCrumb: string
      meta: { title: string; url: string }
    }
  | undefined

export const getMaratonMeta = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      women: zd.boolean(),
      table: zd.enum(['all', 'home', 'away']).catch('all'),
    }),
  )
  .handler(
    async ({
      data: { women, table },
    }): Promise<TablesReturn> => {
      try {
        const breadCrumb = `${table === 'all' ? 'Alla matcher' : table === 'home' ? 'Hemmamatcher' : 'Bortamatcher'}`
        const title = `Bandyresultat - Maratontabell ${table === 'all' ? 'Alla' : table === 'home' ? 'Hemmamatcher' : 'Bortamatcher'} ${women === true ? 'Damer' : 'Herrar'}`
        const url = `https://bandyresultat.se/maraton/table/${table}?women=${women}`

        const meta = {
          title,
          url,
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
