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
import { County } from '@/lib/types/county'
import { Municipality } from '@/lib/types/municipality'
import { Team } from '@/lib/types/team'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns, SQL } from 'drizzle-orm'

type TeamsForPlayoffMapReturn =
  | {
      status: 404
      message: string
    }
  | {
      status: 200
      teams: { team: Team; county: County; municipality: Municipality }[]
    }
  | undefined

export const getTeamsForPlayoffMap = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ year: zd.int(), women: zd.boolean() })),
  )
  .handler(
    async ({ data: { year, women } }): Promise<TeamsForPlayoffMapReturn> => {
      try {
        if (year < 1973 && women) {
          return {
            status: 404,
            message: 'Damernas första säsong var 1972/1973.',
          }
        }
        const seasonYear = seasonIdCheck.parse(year)
        if (!seasonYear) {
          return { status: 404, message: 'Säsongen finns inte.' }
        }

        const playoffSeasonArr = await db
          .select({ ...getTableColumns(playoffseason) })
          .from(playoffseason)
          .leftJoin(seasons, eq(seasons.seasonId, playoffseason.seasonId))
          .where(and(eq(seasons.year, seasonYear), eq(seasons.women, women)))

        if (playoffSeasonArr.length === 0) {
          return { status: 404, message: 'Ingen slutspelsdata.' }
        }

        const playoffSeason = playoffSeasonArr[0]

        const teamArray = await db
          .selectDistinctOn([teamgames.teamId], {
            team: getTableColumns(teams) as unknown as SQL<Team>,
            county: getTableColumns(county) as unknown as SQL<County>,
            municipality: getTableColumns(
              municipality,
            ) as unknown as SQL<Municipality>,
          })
          .from(teamgames)
          .leftJoin(teams, eq(teams.teamId, teamgames.teamId))
          .leftJoin(
            municipality,
            eq(teams.municipalityId, municipality.municipalityId),
          )
          .leftJoin(county, eq(teams.countyId, county.countyId))
          .where(
            and(
              eq(teamgames.seasonId, playoffSeason.seasonId),
              eq(teamgames.playoff, true),
            ),
          )

        return { status: 200, teams: teamArray }
      } catch (error) {
        catchError(error)
      }
    },
  )
