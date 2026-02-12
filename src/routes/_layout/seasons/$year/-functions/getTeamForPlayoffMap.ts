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
import { and, eq, getTableColumns, ne, SQL } from 'drizzle-orm'

type Meta = {
  url: string
  description: string
  title: string
}

type TeamsForPlayoffMapReturn =
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 200
      teams: { team: Team; county: County; municipality: Municipality }[]
      breadCrumb: string
      meta: Meta
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
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = `Karta`
        const title = `Bandyresultat - Slutspelskarta - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/playoff/map?women=${women}`
        const description = `Slutspelskarta säsongen ${seasonYear} för ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1973 && women) {
          return {
            status: 404,
            message: 'Damernas första säsong var 1972/1973.',
            breadCrumb,
            meta,
          }
        }
        const season = await db.query.seasons.findFirst({
          where: (seasons, { and, eq }) =>
            and(eq(seasons.year, seasonYear!), eq(seasons.women, women)),
        })

        if (!season) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
            breadCrumb,
            meta,
          }
        }

        const playoffSeasonArr = await db
          .select({ ...getTableColumns(playoffseason) })
          .from(playoffseason)
          .leftJoin(seasons, eq(seasons.seasonId, playoffseason.seasonId))
          .where(
            and(
              eq(seasons.seasonId, season.seasonId),
              eq(seasons.women, women),
            ),
          )

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
              ne(teamgames.teamId, 176),
            ),
          )

        return { status: 200, teams: teamArray, breadCrumb, meta }
      } catch (error) {
        catchError(error)
      }
    },
  )
