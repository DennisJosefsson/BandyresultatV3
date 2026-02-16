import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Game } from '@/lib/types/game'
import { Meta } from '@/lib/types/meta'
import { Serie } from '@/lib/types/serie'
import { ReturnDevDataTableItem } from '@/lib/types/table'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getDevelopmentData } from './devDataFunctions'

type DevDataReturn =
  | {
      status: 200
      tables: { date: string; table: ReturnDevDataTableItem[] }[]
      games: { date: string; games: Omit<Game, 'season'>[] }[]
      serie: Serie
      dates: string[]
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | undefined

export const getDevData = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        group: zd.string(),
        year: zd.int(),
        women: zd.boolean(),
        origin: zd.enum(['interval', 'development']),
      }),
    ),
  )
  .handler(
    async ({
      data: { group, year, women, origin },
    }): Promise<DevDataReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = origin === 'development' ? 'Utveckling' : 'Intervall'

        const title =
          origin === 'development'
            ? `Bandyresultat - Utveckling - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
            : `Bandyresultat - Intervall - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url =
          origin === 'development'
            ? `https://bandyresultat.se/seasons/${year}/${group}/development?women=${women}`
            : `https://bandyresultat.se/seasons/${year}/${group}/interval?women=${women}`
        const description =
          origin === 'development'
            ? `Hur ${group} har utvecklats omgång för omgång ${seasonYear}`
            : `Hur ${group} har utvecklats mellan olika omgångar ${seasonYear}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1930) {
          return {
            status: 404,
            message: 'Inga serietabeller för den här säsongen',
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

        if (serie.hasStatic) {
          return {
            status: 404,
            message: 'Serien har enbart sluttabell.',
            breadCrumb,
            meta,
          }
        }

        const results = await getDevelopmentData({ serie })

        if (results.dates.length === 0) {
          return {
            status: 404,
            message: 'Inga matcher har spelats.',
            breadCrumb,
            meta,
          }
        }

        return {
          status: 200,
          ...results,
          serie,
          breadCrumb,
          meta,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
