import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { FiveSeason } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { getLastFiveSeasons } from './getLastFiveSeasons'

type TablesResponse =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      fiveSeasons: Array<FiveSeason>
    }
  | undefined

export const getSingleTeamFiveTables = createServerFn({
  method: 'GET',
})
  .validator(
    zd
      .number('Lag-id måste vara en siffra.')
      .int('Lag-id måste vara ett heltal.')
      .positive(
        'Lag-id får ej vara ett minustal eller noll.',
      ),
  )
  .middleware([errorMiddleware])
  .handler(
    async ({ data: teamId }): Promise<TablesResponse> => {
      try {
        const fiveSeasons = await getLastFiveSeasons({
          teamId,
        })

        if (fiveSeasons.length === 0) {
          throw new Error404({
            message: 'Finns inga tabeller för laget.',
          })
        }

        return { status: 200, fiveSeasons }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
