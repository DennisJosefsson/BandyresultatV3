import { db } from '@/db'
import { games, seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Meta } from '@/lib/types/meta'
import { Stats } from '@/lib/types/stats'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getGroupStatsData } from './getGroupStatsData'

type GroupStatsReturn =
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | (Stats & { breadCrumb: string; meta: Meta })
  | undefined

export const getGroupStats = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        group: zd.string(),
        year: zd.int(),
        women: zd.boolean(),
      }),
    ),
  )
  .handler(
    async ({ data: { group, year, women } }): Promise<GroupStatsReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        const breadCrumb = 'Statistik'
        const title = `Bandyresultat - Statistik - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
        const url = `https://bandyresultat.se/seasons/${year}/${group}/stats?women=${women}`
        const description = `Statistik ${group} ${seasonYear} ${women ? 'damer' : 'herrar'}`
        const meta = {
          title,
          url,
          description,
        }
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Enbart slutspelsmatcher denna säsong, statistiken finns under slutspel.',
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

        const gameCount = await db.$count(
          games,
          and(eq(games.serieId, serie.serieId), eq(games.played, true)),
        )

        if (serie.hasStatic && gameCount === 0) {
          return {
            status: 404,
            message: 'Serien har enbart sluttabell, ingen matchdata.',
            breadCrumb,
            meta,
          }
        }

        if (gameCount === 0) {
          return {
            status: 404,
            message: 'Serien har inga spelade matcher.',
            breadCrumb,
            meta,
          }
        }

        const data = await getGroupStatsData({ serie })

        return { status: 200, serie, gameCount, ...data, breadCrumb, meta }
      } catch (error) {
        catchError(error)
      }
    },
  )
