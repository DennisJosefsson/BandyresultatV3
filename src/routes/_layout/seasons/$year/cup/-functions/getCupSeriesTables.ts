import { db } from '@/db'
import {
  competitions,
  seasons,
  series,
  teamgames,
} from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamSeasonTable } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  eq,
  getTableColumns,
  inArray,
} from 'drizzle-orm'
import { getUnionedTables } from './cupQueries'

type CupTablesReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
      tables: Array<TeamSeasonTable>
      tableLength: number
    }
  | { status: 404; message: string }
  | undefined

export const getCupSeriesTables = createServerFn({
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
    }): Promise<CupTablesReturn> => {
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
                'cup-regular',
                'cup-qualification',
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

        const teamArray = await db
          .selectDistinct({
            teamId: teamgames.teamId,
            group: series.group as unknown as SQL<string>,
          })
          .from(teamgames)
          .leftJoin(
            series,
            eq(series.serieId, teamgames.serieId),
          )
          .leftJoin(
            competitions,
            eq(
              series.competitionId,
              competitions.competitionId,
            ),
          )
          .where(
            and(
              inArray(series.category, [
                'cup-regular',
                'cup-qualification',
              ]),
              eq(
                competitions.competitionId,
                competition.competitionId,
              ),
            ),
          )
          .groupBy(series.group, teamgames.teamId)

        const tables = await Promise.all(
          competitionSeries.map(async (serie) => {
            return {
              serie: serie,
              table: await getUnionedTables({
                serie,
                teamArray: teamArray
                  .filter((t) => t.group === serie.group)
                  .map((t) => t.teamId),
              }),
            }
          }),
        )

        const tableLength = tables.reduce(
          (acc, curr) => acc + curr.table.length,
          0,
        )

        return {
          status: 200,
          competition,
          tables,
          tableLength,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
