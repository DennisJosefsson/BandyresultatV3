import { db } from '@/db'
import {
  parentchildseries,
  series,
  teams,
  teamseasons,
  teamseries,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, asc, desc, eq, getTableColumns, ne, SQL, sql } from 'drizzle-orm'

export const getSerieForEdit = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        seasonId: zd.number().positive().int(),
        serieId: zd.number().positive().int(),
      }),
    ),
  )
  .handler(async ({ data: { seasonId, serieId } }) => {
    try {
      const serie = await db
        .select()
        .from(series)
        .where(eq(series.serieId, serieId))

      if (serie.length === 0) throw new Error('Serie saknas')

      const getSeries = await db
        .select({
          value: series.serieId,
          label: series.serieName,
        })
        .from(series)
        .where(and(eq(series.seasonId, seasonId), ne(series.serieId, serieId)))
        .orderBy(desc(series.level))

      const parentSeries = await db
        .select({
          ...getTableColumns(parentchildseries),
          parent: {
            serieId: series.serieId,
            serieName: series.serieName,
          } as unknown as SQL<{ serieId: number; serieName: string }>,
        })
        .from(parentchildseries)
        .leftJoin(series, eq(parentchildseries.parentId, series.serieId))
        .where(eq(parentchildseries.childId, serieId))

      const teamsInSerie = await db
        .select({
          ...getTableColumns(teamseries),
          team: {
            teamId: teams.teamId,
            name: teams.name,
            shortName: teams.shortName,
            casualName: teams.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseries)
        .leftJoin(teams, eq(teams.teamId, teamseries.teamId))
        .where(eq(teamseries.serieId, serieId))
        .orderBy(asc(sql`teams.casual_name collate "se-SE-x-icu"`))

      const teamsInSeason = await db
        .select({
          ...getTableColumns(teamseasons),
          team: {
            teamId: teams.teamId,
            name: teams.name,
            shortName: teams.shortName,
            casualName: teams.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseasons)
        .leftJoin(teams, eq(teams.teamId, teamseasons.teamId))
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(asc(sql`teams.casual_name collate "se-SE-x-icu"`))

      return {
        status: 200,
        series: getSeries,
        serie: serie[0],
        parentSeries,
        teamsInSerie,
        teamsInSeason,
      }
    } catch (error) {
      catchError(error)
    }
  })
