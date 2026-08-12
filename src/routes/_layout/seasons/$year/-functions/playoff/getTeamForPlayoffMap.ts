import { db } from '@/db'
import {
  county,
  municipality,
  playoffseason,
  seasons,
  teamgames,
  teams,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { County } from '@/lib/types/county'
import type { Municipality } from '@/lib/types/municipality'
import type { Team } from '@/lib/types/team'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { and, eq, getTableColumns, ne } from 'drizzle-orm'

type TeamsForPlayoffMapReturn =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      teams: Array<{
        team: Team
        county: County
        municipality: Municipality
      }>
    }
  | undefined

export const getTeamsForPlayoffMap = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ year: zd.int(), women: zd.boolean() }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<TeamsForPlayoffMapReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }
        const season = await db.query.seasons.findFirst({
          where: (seasonsSchema, { and: AND, eq: equal }) =>
            AND(
              equal(seasonsSchema.year, seasonYear!),
              equal(seasonsSchema.women, women),
            ),
        })

        if (!season) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
          }
        }

        const playoffSeasonArr = await db
          .select({ ...getTableColumns(playoffseason) })
          .from(playoffseason)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, playoffseason.seasonId),
          )
          .where(
            and(
              eq(seasons.seasonId, season.seasonId),
              eq(seasons.women, women),
            ),
          )

        const playoffSeason = playoffSeasonArr[0]

        const teamArray = await db
          .selectDistinctOn([teamgames.teamId], {
            team: getTableColumns(
              teams,
            ) as unknown as SQL<Team>,
            county: getTableColumns(
              county,
            ) as unknown as SQL<County>,
            municipality: getTableColumns(
              municipality,
            ) as unknown as SQL<Municipality>,
          })
          .from(teamgames)
          .leftJoin(
            teams,
            eq(teams.teamId, teamgames.teamId),
          )
          .leftJoin(
            municipality,
            eq(
              teams.municipalityId,
              municipality.municipalityId,
            ),
          )
          .leftJoin(
            county,
            eq(teams.countyId, county.countyId),
          )
          .where(
            and(
              eq(
                teamgames.seasonId,
                playoffSeason.seasonId,
              ),
              eq(teamgames.playoff, true),
              ne(teamgames.teamId, 176),
            ),
          )

        return {
          status: 200,
          teams: teamArray,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
