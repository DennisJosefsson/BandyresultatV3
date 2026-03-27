import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import type { SQL } from 'drizzle-orm'
import { desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { seasons, teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import { zd } from '@/lib/utils/zod'

type TeamSeasonReturn =
  | {
      status: 404
      message: string
      meta: Meta
      breadCrumb: string
    }
  | {
      status: 200
      meta: Meta
      breadCrumb: string
      seasons: Array<{
        seasonId: number
        year: string
      }>
      rest: Array<{
        seasonId: number
        year: string
      }>
    }
  | undefined

export const getTeamSeasons = createServerFn({
  method: 'GET',
})
  .inputValidator(zodValidator(zd.number()))
  .middleware([errorMiddleware])
  .handler(
    async ({ data: teamId }): Promise<TeamSeasonReturn> => {
      try {
        const team = await db.query.teams.findFirst({
          where: (teams, { eq: equal }) =>
            equal(teams.teamId, teamId),
        })

        let breadCrumb = 'Säsonger'
        let title = `Bandyresultat`
        let description = `Laget finns inte`
        let url = `https://bandyresultat.se/teams`
        if (!team) {
          return {
            status: 404,
            message: 'Laget finns inte.',
            breadCrumb,
            meta: { description, title, url },
          }
        }

        const teamSeasons = await db
          .select({
            year: seasons.year as unknown as SQL<string>,
          })
          .from(teamseasons)
          .leftJoin(
            seasons,
            eq(teamseasons.seasonId, seasons.seasonId),
          )
          .where(eq(teamseasons.teamId, teamId))
          .orderBy(desc(teamseasons.seasonId))
          .then((res) => {
            return res.map((item) => {
              return {
                seasonId: item.year.includes('/')
                  ? parseInt(item.year.split('/')[1])
                  : parseInt(item.year),
                year: item.year,
              }
            })
          })

        if (!teamSeasons || teamSeasons.length === 0) {
          return {
            status: 404,
            message: `${team.name} har inga säsonger i databasen.`,
            breadCrumb,
            meta: {
              description: `${team.name} har inga säsonger i databasen.`,
              title,
              url,
            },
          }
        }

        breadCrumb = 'Säsonger'
        title = `Bandyresultat - ${team.name} - Säsonger`
        description = `Säsongslista för ${team.name}`
        url = `https://bandyresultat.se/teams/${team.teamId}/seasons?women=${team.women}`

        if (teamSeasons.length > 10) {
          const copy = [...teamSeasons]
          const head = copy.splice(0, 8)
          return {
            status: 200,
            seasons: head,
            rest: copy,
            breadCrumb,
            meta: { description, title, url },
          }
        } else {
          return {
            status: 200,
            seasons: teamSeasons,
            rest: [],
            breadCrumb,
            meta: { description, title, url },
          }
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
