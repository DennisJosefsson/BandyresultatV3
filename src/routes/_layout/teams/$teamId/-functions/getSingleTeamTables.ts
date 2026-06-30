import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { SingleTeamTables } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getTables } from './getTables'
import { getAllTeamsSeasons } from './singleTeamQueries'

type TablesResponse =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      tables: SingleTeamTables
    }
  | undefined

export const getSingleTeamTables = createServerFn({
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
        const allSeasons = await getAllTeamsSeasons(teamId)
        const tables = await getTables({
          teamId,
          seasonIdArray: allSeasons.rows.map(
            (season) => season.seasonId,
          ),
        })

        if (tables.length === 0) {
          return {
            status: 404,
            message: 'Finns inga tabeller för laget.',
          }
        }

        return { status: 200, tables }
      } catch (error) {
        catchError(error)
      }
    },
  )
