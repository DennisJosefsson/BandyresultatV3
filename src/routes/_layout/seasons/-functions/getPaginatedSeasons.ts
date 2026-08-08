import { catchError } from '@/lib/middlewares/errors/catchError'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { preparedPagSeasons } from './preparedPaginatedSeasons'

export const searchParams = zd.object({
  page: zd.number().optional().catch(1),
  women: zd.boolean(),
})

type SeasonsReturn =
  | {
      status: 200

      seasons: Array<{
        year: string
        seasonId: number
        group: string | null
      }>
    }
  | { status: 404; message: string }
  | undefined

export const getPaginatedSeasons = createServerFn({
  method: 'GET',
})
  .validator(searchParams)
  .handler(async ({ data }): Promise<SeasonsReturn> => {
    try {
      const page = data.page ?? 1

      const pagSeasons = await preparedPagSeasons.execute({
        offset: (page - 1) * 12,
        women: data.women,
      })

      if (pagSeasons.length === 0) {
        if (data.women) {
          return {
            status: 404,
            message: 'Damernas första säsong är 1972/1973.',
          }
        }
        return {
          status: 404,

          message: 'Hittade inte fler säsonger.',
        }
      }

      return { status: 200, seasons: pagSeasons }
    } catch (error) {
      catchError(error)
    }
  })
