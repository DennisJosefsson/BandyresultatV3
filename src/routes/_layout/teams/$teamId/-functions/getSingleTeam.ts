import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import type { SingleTeam } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getTeam } from './singleTeamQueries'

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
    }
  | undefined

export const getSingleTeam = createServerFn({
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
          breadCrumb,
          meta,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
