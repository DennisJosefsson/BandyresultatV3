import { db } from '@/db'
import { competitions, seasons, series } from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
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
  asc,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import { getCupPlayoffTableData } from './getCupPlayoffTableData'

type CupPlayoffReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
      finalGames: Array<Omit<Game, 'season'>>
      bronzeGames: Array<Omit<Game, 'season'>>
      playoffTables: Array<PlayoffCategoryArray>
      playoffSeriesTables:
        | Array<PlayoffSeriesTable>
        | undefined
    }
  | { status: 404; message: string }
  | undefined

export const getCupPlayoffTables = createServerFn({
  method: 'GET',
})
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
    }): Promise<CupPlayoffReturn> => {
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
            and(
              eq(
                series.competitionId,
                competition.competitionId,
              ),
              inArray(series.category, [
                'cup-playoffseries',
                'cup-eight',
                'cup-quarter',
                'cup-semi',
                'cup-bronze',
                'cup-final',
              ]),
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

        const playoffData = await getCupPlayoffTableData({
          competition,
          serieArray: competitionSeries,
        })

        return {
          status: 200,
          competition: competition,
          ...playoffData,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
