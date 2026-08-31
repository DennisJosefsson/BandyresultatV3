import { db } from '@/db'
import { competitions, seasons, series } from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Game } from '@/lib/types/game'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, asc, eq, getTableColumns } from 'drizzle-orm'
import { cupGames } from './cupQueries'

type CupGame = Omit<Game, 'season'> & {
  serie: { serieId: number; serieName: string }
}

type CupGameReturn =
  | {
      status: 200
      played: Array<CupGame>
      unplayed: Array<CupGame>
      competition: typeof competitions.$inferSelect
      playedLength: number
      unplayedLength: number
    }
  | { status: 404; message: string }
  | undefined

export const getCupGames = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      competitionName: zd
        .string()
        .transform((val) => val.replaceAll('_', ' ')),
      seasonYear: zd.string(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { competitionName, seasonYear, women },
    }): Promise<CupGameReturn> => {
      try {
        const season = await db
          .select({ ...getTableColumns(seasons) })
          .from(seasons)
          .where(
            and(
              eq(seasons.year, seasonYear),
              eq(seasons.women, women),
            ),
          )
          .then((res) => {
            if (res.length === 0) return undefined
            return res[0]
          })

        if (!season) {
          throw new Error404({
            message: 'Säsongen finns inte.',
          })
        }

        const competition = await db
          .select()
          .from(competitions)
          .where(
            and(
              eq(
                competitions.competitionName,
                competitionName,
              ),
              eq(competitions.seasonId, season.seasonId),
              eq(competitions.isCup, true),
            ),
          )
          .then((res) => {
            if (res.length === 0) return undefined
            return res[0]
          })

        if (!competition) {
          throw new Error404({
            message: 'Cupen finns inte.',
          })
        }

        const competitionSeries = await db
          .select({ ...getTableColumns(series) })
          .from(series)
          .where(
            eq(
              series.competitionId,
              competition.competitionId,
            ),
          )
          .orderBy(asc(series.level))
          .then((res) => {
            if (res.length === 0) return undefined
            else return res
          })

        if (!competitionSeries) {
          throw new Error404({
            message: 'Turneringen har inga serier än.',
          })
        }

        const playedGames = await cupGames({
          competitionId: competition.competitionId,
          played: true,
        })

        const unplayedGames = await cupGames({
          competitionId: competition.competitionId,
          played: false,
        })

        const playedLength = playedGames.length
        const unplayedLength = unplayedGames.length

        if (playedLength + unplayedLength === 0) {
          throw new Error404({
            message: 'Inga matcher inlagda i cupen.',
          })
        }

        return {
          status: 200,
          played: playedGames,
          unplayed: unplayedGames,
          competition: competition,
          playedLength,
          unplayedLength,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
