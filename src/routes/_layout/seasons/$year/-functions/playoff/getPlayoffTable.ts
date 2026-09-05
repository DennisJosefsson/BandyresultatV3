import { db } from '@/db'
import { playoffseason, seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Game } from '@/lib/types/game'
import type {
  PlayoffCategoryArray,
  PlayoffSeriesTable,
} from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import {
  and,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import { getPlayoffTableData } from './getPlayoffTableData'

type PlayoffTableReturn =
  | {
      status: 200
      finalGames: Array<Omit<Game, 'season'>>
      bronzeGames: Array<Omit<Game, 'season'>>
      playoffTables: Array<PlayoffCategoryArray>
      playoffSeriesTables:
        | Array<PlayoffSeriesTable>
        | undefined
      playoffSeason: typeof playoffseason.$inferSelect
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getPlayoffTable = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ year: zd.number(), women: zd.boolean() }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<PlayoffTableReturn> => {
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
                  .select({ seasonId: seasons.seasonId })
                  .from(seasons)
                  .where(
                    and(
                      eq(seasons.intYear, year),
                      eq(seasons.women, women),
                    ),
                  ),
              ),
            ),
          )

        if (playoffSeasonArr.length === 0) {
          return {
            status: 404,
            message: 'Inga slutspelstabeller.',
          }
        }

        const playoffSeason = playoffSeasonArr[0]
        const playoffData = await getPlayoffTableData({
          playoffSeason,
        })

        return {
          status: 200,
          ...playoffData,
          playoffSeason,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
