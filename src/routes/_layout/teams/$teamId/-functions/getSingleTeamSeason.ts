import { db } from '@/db'
import { teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Meta } from '@/lib/types/meta'
import type { Team } from '@/lib/types/team'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'

import type { TeamSeasonCompetitionTables } from '@/lib/types/table'
import { preparedSeasonResultArray } from './preparedQueries/teamseason/preparedSeasonGamesAndTables'
import { getSeasons } from './singleTeamSeasonFunctions'

type SingeTeamSeasonReturn =
  | {
      status: 200
      breadCrumb: string
      meta: Meta
      seasonResult: Array<TeamSeasonCompetitionTables>
      team: Team
      seasonYear: string
      firstSeason: {
        year: string
        seasonId: number
      }
      lastSeason: {
        year: string
        seasonId: number
      }
      nextSeason:
        | {
            year: string
            seasonId: number
          }
        | undefined
      previousSeason:
        | {
            year: string
            seasonId: number
          }
        | undefined
    }
  | {
      status: 404
      breadCrumb: string
      meta: Meta
      message: string
    }
  | undefined

export const getSingleTeamSeason = createServerFn({
  method: 'GET',
})
  .validator(
    zd.object({
      teamId: zd.number(),
      seasonId: zd.number(),
    }),
  )
  .middleware([errorMiddleware])
  .handler(
    async ({
      data: { teamId, seasonId },
    }): Promise<SingeTeamSeasonReturn> => {
      try {
        const team = await db.query.teams.findFirst({
          where: (teamsSchema, { eq: equal }) =>
            equal(teamsSchema.teamId, teamId),
          with: { teamname: { with: { logo: true } } },
        })

        let breadCrumb = 'Säsong'
        let title = `Bandyresultat`
        let description = `Finns inget sådant lag.`
        let url = `https://bandyresultat.se/teams`

        if (!team) {
          return {
            status: 404,
            breadCrumb,
            meta: { title, description, url },
            message: 'Finns inget sådant lag.',
          }
        }
        const seasonYear = seasonIdCheck.parse(seasonId)

        if (!seasonYear) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title,
              description: 'Fel säsongsId',
              url,
            },
            message: 'Fel säsongsId.',
          }
        }

        const season = await db.query.seasons.findFirst({
          where: (seasonsSchema, { eq: equal, and: AND }) =>
            AND(
              equal(seasonsSchema.women, team.women),
              equal(seasonsSchema.intYear, seasonId),
            ),
        })

        if (!season) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title: `Bandyresultat - ${team.teamname.name}`,
              description: `Finns ingen säsong ${seasonYear} för ${team.women ? 'damer' : 'herrar'}.`,
              url,
            },
            message: `Finns ingen säsong ${seasonYear} för ${team.women ? 'damer' : 'herrar'}.`,
          }
        }

        const teamSeason = db
          .select()
          .from(teamseasons)
          .where(
            and(
              eq(teamseasons.teamId, team.teamId),
              eq(teamseasons.seasonId, season.seasonId),
            ),
          )

        if (!teamSeason) {
          return {
            status: 404,
            breadCrumb,
            meta: {
              title: `Bandyresultat - ${team.teamname.name}`,
              description: `${team.teamname.casualName} har inte säsongen ${season.year} i databasen än.`,
              url: `https://www.bandyresultat.se/teams/${team.teamId}`,
            },
            message: `${team.teamname.casualName} har inte säsongen ${season.year} i databasen än.`,
          }
        }
        const seasonResult =
          await preparedSeasonResultArray.execute({
            teamId,
            intYear: seasonId,
          })

        const seasonObjects = await getSeasons({
          teamId,
          seasonId: season.seasonId,
        })

        breadCrumb = season.year
        title = `Bandyresultat - ${team.teamname.name} - ${season.year}`
        description = `Information om ${team.teamname.name} ${season.year}`
        url = `https://bandyresultat.se/teams/${team.teamId}/${seasonYear}?women=${team.women}`

        return {
          status: 200,
          seasonResult,
          team,
          seasonYear,
          ...seasonObjects,
          breadCrumb,
          meta: { title, description, url },
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
