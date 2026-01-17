import { db } from '@/db'
import { games, playoffseason, seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Game } from '@/lib/types/game'
import { GroupPlayoffTable, PlayoffSeriesTable } from '@/lib/types/table'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getPlayoffTableData } from './getPlayoffTableData'

type PlayoffTableReturn =
  | {
      status: 200
      finalGames: Omit<Game, 'season'>[]
      semiTables: GroupPlayoffTable[] | undefined
      quarterTables: GroupPlayoffTable[] | undefined
      eightTables: GroupPlayoffTable[] | undefined
      playoffSeriesTables: PlayoffSeriesTable[] | undefined
      playoffSeason: typeof playoffseason.$inferSelect
    }
  | { status: 404; message: string }
  | undefined

export const getPlayoffTable = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ year: zd.number(), women: zd.boolean() })),
  )
  .handler(async ({ data: { year, women } }): Promise<PlayoffTableReturn> => {
    try {
      if (year < 1973 && women) {
        return {
          status: 404,
          message: 'Damernas första säsong var 1972/1973.',
        }
      }
      const seasonYear = seasonIdCheck.parse(year)
      if (!seasonYear) {
        return { status: 404, message: 'Säsongen finns inte.' }
      }

      const playoffSeasonArr = await db
        .select({ ...getTableColumns(playoffseason) })
        .from(playoffseason)
        .leftJoin(seasons, eq(seasons.seasonId, playoffseason.seasonId))
        .where(and(eq(seasons.year, seasonYear), eq(seasons.women, women)))

      if (playoffSeasonArr.length === 0) {
        return { status: 404, message: 'Ingen slutspelsdata.' }
      }

      const playoffSeason = playoffSeasonArr[0]

      const playoffGamesCount = await db.$count(
        games,
        and(
          eq(games.seasonId, playoffSeason.seasonId),
          eq(games.playoff, true),
        ),
      )

      if (playoffGamesCount === 0) {
        return { status: 404, message: 'Inga slutspelsmatcher är inlagda.' }
      }

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
  })
