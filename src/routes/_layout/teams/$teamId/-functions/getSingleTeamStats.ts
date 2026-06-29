import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  SingleTeam,
  TeamPlayoffStreak,
  TeamStatItem,
  TeamStreak,
} from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getStats } from './getStats'
import { getStreaks } from './getStreaks'
import {
  getStatsCounts,
  getTeam,
} from './singleTeamQueries'

type TablesResponse =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      team: SingleTeam
      statCounts: {
        firstDivSeasonsCount: number
        qualificationSeasonsCount: number
        firstFirstDivisionSeason: {
          seasonId: number
          year: string
        } | null
        latestFirstDivisionSeason: {
          seasonId: number
          year: string
        } | null
        finalCount: number
        finalWinCount: number
        finalWins: Array<string>
        latestFinal: string | null
        latestFinalWin: string | null
        playoffCount: number
      }
      streaks: {
        losingStreak: Array<TeamStreak>
        drawStreak: Array<TeamStreak>
        winStreak: Array<TeamStreak>
        noWinStreak: Array<TeamStreak>
        unbeatenStreak: Array<TeamStreak>
        streakObjectsLength: number
        playoffStreak: Array<TeamPlayoffStreak>
      }
      stats: {
        maxScoredHomeGames: Array<TeamStatItem>
        maxScoredAwayGames: Array<TeamStatItem>
        maxGoalDifferenceHomeGames: Array<TeamStatItem>
        maxGoalDifferenceAwayGames: Array<TeamStatItem>
        minGoalDifferenceHomeGames: Array<TeamStatItem>
        minGoalDifferenceAwayGames: Array<TeamStatItem>
        maxConcededHomeGames: Array<TeamStatItem>
        maxConcededAwayGames: Array<TeamStatItem>
        maxTotalHomeGames: Array<TeamStatItem>
        maxTotalAwayGames: Array<TeamStatItem>
        minTotalHomeGames: Array<TeamStatItem>
        minTotalAwayGames: Array<TeamStatItem>
      }
    }
  | undefined

export const getSingleTeamStats = createServerFn({
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
        const team = await getTeam(teamId)
        if (!team) {
          return {
            status: 404,
            message: 'Laget finns inte.',
          }
        }

        const statCounts = await getStatsCounts({ team })

        const streaks = await getStreaks({
          teamId,
        })

        const stats = await getStats({ teamId })

        return {
          status: 200,
          statCounts,
          stats,
          streaks,
          team,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
