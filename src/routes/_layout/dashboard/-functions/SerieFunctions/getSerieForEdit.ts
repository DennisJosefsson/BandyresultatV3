import { db } from '@/db'
import {
  competitions,
  parentchildseries,
  seasons,
  series,
  teamcompetitions,
  teams,
  teamseries,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  ne,
  sql,
} from 'drizzle-orm'

export const getSerieForEdit = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      seasonId: zd.number().positive().int(),
      serieId: zd.number().positive().int(),
    }),
  )
  .handler(async ({ data: { seasonId, serieId } }) => {
    try {
      const serie = await db
        .select({
          ...getTableColumns(series),
          season: {
            women: seasons.women,
          } as unknown as SQL<{ women: boolean }>,
          competition: {
            competitionId: competitions.competitionId,
            isCup: competitions.isCup,
          } as unknown as SQL<{
            competitionId: number
            isCup: boolean | null
          }>,
        })
        .from(series)
        .leftJoin(
          seasons,
          eq(series.seasonId, seasons.seasonId),
        )
        .leftJoin(
          competitions,
          eq(
            series.competitionId,
            competitions.competitionId,
          ),
        )
        .where(eq(series.serieId, serieId))
        .then((res) => {
          if (res.length === 0) return undefined
          return res[0]
        })

      if (!serie) throw new Error('Serien finns inte.')

      const getSeries = await db
        .select({
          value: series.serieId,
          label: series.serieName,
        })
        .from(series)
        .where(
          and(
            eq(series.seasonId, seasonId),
            ne(series.serieId, serieId),
          ),
        )
        .orderBy(desc(series.level))

      const parentSeries = await db
        .select({
          ...getTableColumns(parentchildseries),
          parent: {
            serieId: series.serieId,
            serieName: series.serieName,
          } as unknown as SQL<{
            serieId: number
            serieName: string
          }>,
        })
        .from(parentchildseries)
        .leftJoin(
          series,
          eq(parentchildseries.parentId, series.serieId),
        )
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
        .leftJoin(
          teams,
          eq(teams.teamId, teamseries.teamId),
        )
        .where(eq(teamseries.serieId, serieId))
        .orderBy(
          asc(sql`teams.casual_name collate "se-SE-x-icu"`),
        )

      const teamsInCompetition = await db
        .select({
          ...getTableColumns(teamcompetitions),
          team: {
            teamId: teams.teamId,
            name: teams.name,
            shortName: teams.shortName,
            casualName: teams.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamcompetitions)
        .leftJoin(
          teams,
          eq(teams.teamId, teamcompetitions.teamId),
        )
        .leftJoin(
          competitions,
          eq(
            teamcompetitions.competitionId,
            competitions.competitionId,
          ),
        )
        .where(
          eq(
            competitions.competitionId,
            serie.competitionId,
          ),
        )
        .orderBy(
          asc(sql`teams.casual_name collate "se-SE-x-icu"`),
        )

      const competitionArray = await db
        .select({ ...getTableColumns(competitions) })
        .from(competitions)
        .where(eq(competitions.seasonId, seasonId))
        .orderBy(asc(competitions.division))

      return {
        status: 200,
        series: getSeries,
        serie: serie,
        parentSeries,
        teamsInSerie,
        teamsInCompetition,
        competitions: competitionArray,
      }
    } catch (error) {
      catchError(error)
    }
  })
