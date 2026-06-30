import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { FiveSeason } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
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
    zodValidator(
      zd
        .number('Lag-id måste vara en siffra.')
        .int('Lag-id måste vara ett heltal.')
        .positive(
          'Lag-id får ej vara ett minustal eller noll.',
        ),
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
          return {
            status: 404,
            message: 'Finns inga tabeller för laget.',
          }
        }

        return { status: 200, fiveSeasons }
      } catch (error) {
        catchError(error)
      }
    },
  )
