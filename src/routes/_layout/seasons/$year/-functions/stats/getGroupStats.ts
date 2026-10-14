import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { mvSeriesStats } from '@/db/views/seasonStatsViews'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Serie } from '@/lib/types/serie'
import type { MvSeriesStats } from '@/lib/types/stats'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'

type GroupStatsReturn =
  | {
      status: 404
      message: string
    }
  | { status: 200; stats: MvSeriesStats; serie: Serie }
  | undefined

export const getGroupStats = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      group: zd.string(),
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { group, year, women },
    }): Promise<GroupStatsReturn> => {
      try {
        if (year < 1930) {
          return {
            status: 404,
            message:
              'Enbart slutspelsmatcher denna säsong, statistiken finns under slutspel.',
          }
        }

        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }

        const serie = await db
          .select({
            ...getTableColumns(series),
          })
          .from(series)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, series.seasonId),
          )
          .where(
            and(
              eq(seasons.women, women),
              eq(seasons.intYear, year),
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
          }

        const seriesStats = await db
          .select()
          .from(mvSeriesStats)
          .where(eq(mvSeriesStats.serieId, serie.serieId))
          .then((res) => res[0])

        const everyNull = Object.values(
          seriesStats.allStats,
        ).every((val) => val === null)

        if (everyNull) {
          throw new Error404({
            message: 'Ingen statistik för serien.',
          })
        }

        // console.dir(seriesStats, {
        //   colors: true,
        //   depth: 99,
        // })

        // const gameCount = await db.$count(
        //   games,
        //   and(
        //     eq(games.serieId, serie.serieId),
        //     eq(games.played, true),
        //   ),
        // )

        // if (serie.hasStatic && gameCount === 0) {
        //   return {
        //     status: 404,
        //     message:
        //       'Serien har enbart sluttabell, ingen matchdata.',
        //   }
        // }

        // if (gameCount === 0) {
        //   return {
        //     status: 404,
        //     message: 'Serien har inga spelade matcher.',
        //   }
        // }

        // const data = await getGroupStatsData({ serie })

        return {
          status: 200,
          serie,
          stats: seriesStats,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
