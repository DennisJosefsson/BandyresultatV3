import { db } from '@/db'
import {
  county,
  municipality,
  seasons,
  series,
  teams,
  teamseries,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { County } from '@/lib/types/county'
import { Meta } from '@/lib/types/meta'
import { Municipality } from '@/lib/types/municipality'
import { Team } from '@/lib/types/team'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns, SQL } from 'drizzle-orm'

type TeamsForGroupMapReturn =
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

export const getTeamsForGroupMap = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({ group: zd.string(), year: zd.int(), women: zd.boolean() }),
    ),
  )
  .handler(
    async ({
      data: { group, year, women },
    }): Promise<TeamsForGroupMapReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = 'Karta'
        const title = `Bandyresultat - Karta - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/map?women=${women}`
        const description = `Karta ${group} ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Enbart slutspelsmatcher denna säsong, kartan finns under slutspel.',
            breadCrumb,
            meta,
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message: 'Damernas första säsong var 1972/1973.',
            breadCrumb,
            meta,
          }
        }

        if (!seasonYear) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
            breadCrumb,
            meta,
          }
        }

        const serie = await db
          .select({
            ...getTableColumns(series),
          })
          .from(series)
          .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
          .where(
            and(
              eq(seasons.women, women),
              eq(seasons.year, seasonYear),
              eq(series.group, group),
            ),
          )
          .then((res) => {
            if (res.length > 0) return res[0]
            else return undefined
          })

        if (!serie)
          return {
            status: 404,
            message: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
            breadCrumb,
            meta,
          }

        const teamArray = await db
          .select({
            team: getTableColumns(teams) as unknown as SQL<Team>,
            county: getTableColumns(county) as unknown as SQL<County>,
            municipality: getTableColumns(
              municipality,
            ) as unknown as SQL<Municipality>,
          })
          .from(teamseries)
          .leftJoin(teams, eq(teams.teamId, teamseries.teamId))
          .leftJoin(
            municipality,
            eq(teams.municipalityId, municipality.municipalityId),
          )
          .leftJoin(county, eq(teams.countyId, county.countyId))
          .where(eq(teamseries.serieId, serie.serieId))

        return { status: 200, teams: teamArray, breadCrumb, meta }
      } catch (error) {
        catchError(error)
      }
    },
  )
