import { db } from '@/db'
import { tables, teams, teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import type { SQL } from 'drizzle-orm'
import { eq, getTableColumns } from 'drizzle-orm'
const defaultTable = {
  games: 0,
  position: 0,
  won: 0,
  draw: 0,
  lost: 0,
  scoredGoals: 0,
  concededGoals: 0,
  goalDifference: 0,
  points: 0,
}

export const getSeriesTableData = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({ serieId: zd.number().positive().int() }),
    ),
  )
  .handler(async ({ data: { serieId } }) => {
    try {
      const serie = await db.query.series.findFirst({
        where: (series, { eq: equal }) =>
          equal(series.serieId, serieId),
        with: {
          season: {
            columns: { women: true },
          },
        },
      })

      if (!serie) throw new Error('Serien finns inte.')

      const seriesTable = await db
        .select({
          ...getTableColumns(tables),
          team: {
            teamId: teams.teamId,
            name: teams.name,
            shortName: teams.shortName,
            casualName: teams.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(tables)
        .leftJoin(teams, eq(tables.teamId, teams.teamId))
        .where(eq(tables.serieId, serieId))

      if (seriesTable.length !== 0) {
        return {
          status: 400,
          message: 'Serietabell finns redan.',
          defaultValues: [
            {
              teamId: 176,
              teamName: 'Inget namn',
              ...defaultTable,
              women: serie.season.women ?? false,
              category: serie.category,
              group: serie.group,
              seasonId: serie.seasonId,
              serieId: serie.serieId,
              qualification:
                serie.category === 'qualification',
            },
          ],
        }
      }

      const tableTeams = await db
        .select({
          teamId: teamseries.teamId,
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
          eq(teamseries.teamId, teams.teamId),
        )
        .where(eq(teamseries.serieId, serieId))

      if (tableTeams.length === 0) {
        return {
          status: 404,
          message: 'Inga lag tillagda',
          defaultValues: [
            {
              teamId: 176,
              teamName: 'Inget namn',
              ...defaultTable,
              women: serie.season.women ?? false,
              category: serie.category,
              group: serie.group,
              seasonId: serie.seasonId,
              serieId: serie.serieId,
              qualification:
                serie.category === 'qualification',
            },
          ],
        }
      }

      const defaultValues = tableTeams.map((team) => {
        return {
          teamId: team.teamId ?? 176,
          teamName: team.team.casualName ?? 'Inget namn',
          ...defaultTable,
          women: serie.season.women ?? false,
          category: serie.category,
          group: serie.group,
          seasonId: serie.seasonId,
          serieId: serie.serieId,
          qualification: serie.category === 'qualification',
        }
      })

      return {
        status: 200,
        table: seriesTable,
        teams: tableTeams,
        serie,
        defaultValues,
      }
    } catch (error) {
      catchError(error)
    }
  })
