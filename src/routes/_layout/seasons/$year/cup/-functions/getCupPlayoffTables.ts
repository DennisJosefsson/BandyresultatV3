import { db } from '@/db'
import { competitions, seasons, series } from '@/db/schema'
import { mvPlayoff } from '@/db/views/playoffViews'
import Error404 from '@/lib/middlewares/errors/404Error'
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
  asc,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'

type CupPlayoffReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
      finalGames: FinalAndBronze | null
      bronzeGames: FinalAndBronze | null
      playoffTree: Array<PlayoffTree> | null
      playoffSeries: Array<PlayoffSeries> | null
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
      year: zd.number(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { competitionName, year, women },
    }): Promise<CupPlayoffReturn> => {
      try {
        const competition = await db
          .select({ ...getTableColumns(competitions) })
          .from(competitions)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, competitions.seasonId),
          )
          .where(
            and(
              eq(
                competitions.competitionName,
                competitionName,
              ),
              eq(seasons.intYear, year),
              eq(seasons.women, women),
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
              inArray(
                series.competitionId,
                db
                  .select({
                    competitionId:
                      competitions.competitionId,
                  })
                  .from(competitions)
                  .leftJoin(
                    seasons,
                    eq(
                      seasons.seasonId,
                      competitions.seasonId,
                    ),
                  )
                  .where(
                    and(
                      eq(seasons.intYear, year),
                      eq(seasons.women, women),
                      eq(
                        competitions.competitionName,
                        competitionName,
                      ),
                      eq(competitions.isCup, true),
                    ),
                  ),
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
          .orderBy(asc(series.level), asc(series.group))
          .then((res) => {
            if (res.length === 0) return undefined
            else return res
          })

        if (!competitionSeries) {
          throw new Error404({
            message: 'Turneringen har inga serier än.',
          })
        }

        const playoffDataV2 = await db
          .select()
          .from(mvPlayoff)
          .where(
            eq(
              mvPlayoff.competitionId,
              competition.competitionId,
            ),
          )
          .then((res) => res[0])

        return {
          status: 200,
          competition: competition,
          ...playoffDataV2,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
