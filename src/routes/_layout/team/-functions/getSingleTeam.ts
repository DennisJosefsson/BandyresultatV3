import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/zod'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getLastFiveSeasons } from './getLastFiveSeasons'
import { getStats } from './getStats'
import { getStreaks } from './getStreaks'
import { getTables } from './getTables'
import { getAllTeamsSeasons, getStrings, getTeam } from './singleTeamQueries'

export const getSingleTeam = createServerFn({ method: 'GET' })
  .inputValidator(
    zodValidator(
      zd
        .number('Lag-id måste vara en siffra.')
        .int('Lag-id måste vara ett heltal.')
        .positive('Lag-id får ej vara ett minustal eller noll.'),
    ),
  )
  .middleware([errorMiddleware])
  .handler(async ({ data: teamId }) => {
    try {
      const team = await getTeam(teamId)

      if (!team || team.teamId === 176) {
        throw notFound({
          data: 404,
        })
      }

      const allSeasons = await getAllTeamsSeasons(teamId)
      const strings = await getStrings({ team, allSeasons })
      const tables = await getTables({
        teamId,
        seasonIdArray: allSeasons.rows.map((season) => season.seasonId),
      })

      const streaks = await getStreaks({
        teamId,
      })

      const stats = await getStats({ teamId })

      const fiveSeasons = await getLastFiveSeasons({ teamId })

      return {
        team,
        tables,
        strings,
        streaks,
        stats,
        fiveSeasons,
      }
    } catch (error) {
      catchError(error)
    }
  })
