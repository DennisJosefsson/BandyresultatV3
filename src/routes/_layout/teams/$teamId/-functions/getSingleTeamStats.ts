import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  SingleTeam,
  TeamSeasonStats,
} from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { preparedTeamSeasonStats } from './preparedQueries/teamseason/preparedTeamSeasonStats'
import { preparedTeamSeasonStatsTEST } from './preparedQueries/teamseason/preparedTeamSeasonStatsTEST'
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

        const stats = await preparedTeamSeasonStats
          .execute({ teamId })
          .then((res) => res[0])

        const end = performance.now()

        const startTEST = performance.now()

        const statsTEST = await preparedTeamSeasonStatsTEST
          .execute({ teamId })
          .then((res) => res[0])

        const endTEST = performance.now()
        console.log(statsTEST.losingStreak)
        console.dir(
          {
            executionTime: end - start,
            executionTimeTEST: endTEST - startTEST,
          },
          { color: true, depth: 99 },
        )

        return {
          status: 200,
          stats,

          team,
          executionTime: end - start,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
