import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'

import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'

import type { Meta } from '@/lib/types/meta'
import type { SingleTeamTables } from '@/lib/types/table'
import type {
  FiveSeason,
  SingleTeam,
  TeamPlayoffStreak,
  TeamStatItem,
  TeamStreak,
} from '@/lib/types/team'
import { getLastFiveSeasons } from './getLastFiveSeasons'
import { getStats } from './getStats'
import { getStreaks } from './getStreaks'
import { getTables } from './getTables'
import {
  getAllTeamsSeasons,
  getStrings,
  getTeam,
} from './singleTeamQueries'

type TeamReturn =
  | {
      status: 404
      meta: Meta
      breadCrumb: string
      message: string
    }
  | {
      status: 200
      meta: Meta
      breadCrumb: string
      team: SingleTeam
      tables: SingleTeamTables
      strings: {
        seasonString: string
        finalsAndWinsString: string
        playoffCountString: string
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
      fiveSeasons: Array<FiveSeason>
    }
  | undefined

export const getSingleTeam = createServerFn({
  method: 'GET',
})
  .inputValidator(
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
    async ({ data: teamId }): Promise<TeamReturn> => {
      try {
        const team = await getTeam(teamId)
        let breadCrumb = `Lag`
        let title = `Bandyresultat - Laget finns ej`
        let url = `https://bandyresultat.se/teams`
        let description = `Laget finns ej.`
        if (!team || team.teamId === 176) {
          return {
            status: 404,
            meta: { title, url, description },
            breadCrumb,
            message: 'Det laget finns inte.',
          }
        }

        const allSeasons = await getAllTeamsSeasons(teamId)
        const strings = await getStrings({
          team,
          allSeasons,
        })
        const tables = await getTables({
          teamId,
          seasonIdArray: allSeasons.rows.map(
            (season) => season.seasonId,
          ),
        })

        const streaks = await getStreaks({
          teamId,
        })

        const stats = await getStats({ teamId })

        const fiveSeasons = await getLastFiveSeasons({
          teamId,
        })

        breadCrumb = `${team.name}`
        title = `Bandyresultat - ${team.name} - ${team.women === true ? 'Damer' : 'Herrar'}`
        url = `https://bandyresultat.se/teams/${team.teamId}?women=${team.women}`
        description = `Information om ${team.name} ${team.women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }

        return {
          status: 200,
          team,
          tables,
          strings,
          streaks,
          stats,
          fiveSeasons,
          breadCrumb,
          meta,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
