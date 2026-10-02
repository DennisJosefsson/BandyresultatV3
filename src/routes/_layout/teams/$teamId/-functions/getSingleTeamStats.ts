import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  SingleTeam,
  TeamSeasonStats,
} from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import {
  preparedTeamRecordsAway,
  preparedTeamRecordsHome,
  preparedTeamStats,
  preparedTeamStreaks,
} from './preparedQueries/teamseason/preparedTeamSeasonStats'
import { getTeam } from './singleTeamQueries'

type TablesResponse =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      team: SingleTeam
      stats: TeamSeasonStats
      executionTime: number
    }
  | undefined

export const getSingleTeamStats = createServerFn({
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
        const team = await getTeam(teamId)
        if (!team) {
          return {
            status: 404,
            message: 'Laget finns inte.',
          }
        }
        const start = performance.now()

        const homeStats = await preparedTeamRecordsHome
          .execute({ teamId })
          .then((res) => res[0])
        const awayStats = await preparedTeamRecordsAway
          .execute({ teamId })
          .then((res) => res[0])

        const teamStreaks = await preparedTeamStreaks
          .execute({
            teamId,
          })
          .then((res) => res[0])
        const teamStats = await preparedTeamStats
          .execute({
            teamId,
          })
          .then((res) => res[0])

        const end = performance.now()

        return {
          status: 200,
          stats: {
            homeRecords: homeStats,
            awayRecords: awayStats,
            ...teamStreaks,
            ...teamStats,
          },

          team,
          executionTime: end - start,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
