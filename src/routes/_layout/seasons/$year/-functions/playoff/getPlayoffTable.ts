import { db } from '@/db'
import {
  competitions,
  playoffseason,
  seasons,
} from '@/db/schema'
import { mvPlayoff } from '@/db/views/playoffViews'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type {
  FinalAndBronze,
  PlayoffSeries,
  PlayoffTree,
} from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import {
  and,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'

type PlayoffTableReturn =
  | {
      status: 200
      finalGames: FinalAndBronze | null
      bronzeGames: FinalAndBronze | null
      playoffTree: Array<PlayoffTree> | null
      playoffSeries: Array<PlayoffSeries> | null
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

        const playoffDataV2 = await db
          .select()
          .from(mvPlayoff)
          .where(
            eq(
              mvPlayoff.competitionId,
              db
                .select({
                  competitionId: competitions.competitionId,
                })
                .from(competitions)
                .where(
                  and(
                    eq(competitions.division, 1),
                    eq(competitions.women, women),
                    eq(
                      competitions.seasonId,
                      db
                        .select({
                          seasonId: seasons.seasonId,
                        })
                        .from(seasons)
                        .where(
                          and(
                            eq(seasons.women, women),
                            eq(seasons.intYear, year),
                          ),
                        ),
                    ),
                  ),
                ),
            ),
          )
          .then((res) => res[0])

        return {
          status: 200,
          ...playoffDataV2,
          playoffSeason,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
