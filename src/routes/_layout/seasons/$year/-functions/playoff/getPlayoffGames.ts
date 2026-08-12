import { db } from '@/db'
import { playoffseason, seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { PlayoffGames } from '@/lib/types/game'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getPlayoffGamesData } from './getPlayoffGamesData'

type GamesReturn =
  | {
      status: 200
      games: PlayoffGames
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getPlayoffGames = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ year: zd.number(), women: zd.boolean() }),
  )
  .handler(
    async ({
      data: { year, women },
    }): Promise<GamesReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        if (year < 1973 && women) {
          return {
            status: 404,
            message:
              'Damernas första säsong var 1972/1973.',
          }
        }

        const season = await db.query.seasons.findFirst({
          where: (seasonsSchema, { and: AND, eq: equal }) =>
            AND(
              equal(seasonsSchema.year, seasonYear!),
              equal(seasonsSchema.women, women),
            ),
        })

        if (!season) {
          return {
            status: 404,
            message: 'Säsongen finns inte.',
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
              eq(seasons.seasonId, season.seasonId),
              eq(seasons.women, women),
            ),
          )

        if (playoffSeasonArr.length === 0) {
          return {
            status: 404,
            message: 'Ingen slutspelsdata.',
          }
        }

        const playoffSeason = playoffSeasonArr[0]

        const results = await getPlayoffGamesData({
          playoffSeason,
        })
        if (!results) {
          return {
            status: 404,
            message: 'Inga slutspelmatcher inlagda.',
          }
        }

        return {
          status: 200,
          games: results,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
