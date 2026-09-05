import { db } from '@/db'
import {
  games,
  playoffseason,
  seasons,
  series,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Stats } from '@/lib/types/stats'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import {
  and,
  count,
  eq,
  exists,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import { getPlayoffStatsData } from './getPlayoffStatsData'

type GroupStatsReturn =
  | {
      status: 404
      message: string
    }
  | Stats
  | undefined

export const getPlayoffStats = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<GroupStatsReturn> => {
      try {
        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
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
              inArray(
                seasons.seasonId,
                db
                  .select({ seasonI: seasons.seasonId })
                  .from(seasons)
                  .where(
                    and(
                      eq(seasons.intYear, year),
                      eq(seasons.women, women),
                    ),
                  ),
              ),
              exists(
                db
                  .select()
                  .from(games)
                  .leftJoin(
                    series,
                    eq(series.serieId, games.serieId),
                  )
                  .leftJoin(
                    seasons,
                    eq(seasons.seasonId, games.seasonId),
                  )
                  .where(
                    and(
                      eq(seasons.intYear, year),
                      eq(seasons.women, women),
                      eq(games.played, true),
                      inArray(series.category, [
                        'playoffseries',
                        'eight',
                        'quarter',
                        'semi',
                        'final',
                      ]),
                    ),
                  ),
              ),
            ),
          )

        console.log(playoffSeasonArr)

        if (playoffSeasonArr.length === 0) {
          return {
            status: 404,
            message: 'Ingen slutspelsdata.',
          }
        }

        const playoffSeason = playoffSeasonArr[0]

        const gameCount = await db
          .select({ count: count() })
          .from(games)
          .leftJoin(
            series,
            eq(series.serieId, games.serieId),
          )
          .where(
            and(
              eq(games.seasonId, playoffSeason.seasonId),
              eq(games.played, true),
              inArray(series.category, [
                'playoffseries',
                'eight',
                'quarter',
                'semi',
                'final',
              ]),
            ),
          )
          .then((res) => res[0].count)

        if (gameCount === 0) {
          return {
            status: 404,
            message: 'Serien har inga spelade matcher.',
          }
        }

        const data = await getPlayoffStatsData({
          playoffSeason,
        })

        return {
          status: 200,
          gameCount,
          ...data,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
