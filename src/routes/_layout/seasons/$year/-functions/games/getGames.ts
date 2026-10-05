import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { mvSeriesGames } from '@/db/views/seriesGamesViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { SeriesGamesV2 } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'

type GamesReturn =
  | {
      status: 200
      games: {
        played: Array<SeriesGamesV2>
        unplayed: Array<SeriesGamesV2>
      }
      serie: Serie
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getGames = createServerFn({ method: 'GET' })
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
    }): Promise<GamesReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        if (!seasonYear)
          return {
            status: 404,
            message: 'Säsongen finns inte.',
          }

        if (year < 1930) {
          return {
            status: 404,
            message:
              'Inga seriematcher inlagda denna säsong.',
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
              eq(series.group, group),
              eq(seasons.women, women),
              eq(seasons.intYear, year),
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

        const newStart = performance.now()

        const seriesGamesV2 = await db
          .select()
          .from(mvSeriesGames)
          .where(
            eq(
              mvSeriesGames.serieId,
              db
                .select({ serieId: series.serieId })
                .from(series)
                .innerJoin(
                  seasons,
                  eq(series.seasonId, seasons.seasonId),
                )
                .where(
                  and(
                    eq(series.group, group),
                    eq(seasons.women, women),
                    eq(seasons.intYear, year),
                  ),
                ),
            ),
          )
          .then((res) => res[0])

        if (seriesGamesV2 === undefined) {
          return {
            status: 404,
            message:
              'Serien har inga matcher än denna säsong.',
          }
        }

        const newEnd = performance.now()

        console.dir(
          {
            seriesGamesV2,
            perfNew: newEnd - newStart,
          },
          {
            colors: true,
            depth: 99,
          },
        )

        if (
          seriesGamesV2.played.length +
            seriesGamesV2.unplayed.length ===
          0
        ) {
          return {
            status: 404,
            message: 'Inga matcher än denna säsong.',
          }
        }

        return {
          status: 200,
          games: seriesGamesV2,

          serie,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
