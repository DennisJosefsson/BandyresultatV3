import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import type { SQL } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { tables, teams, teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'

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

export const getSeriesTableDataForEdit = createServerFn({
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
              tableId: 0,
              teamId: 176,
              teamName: 'Inget namn',
              ...defaultTable,
            },
          ],
        }
      }

      const seriesTable = await db
        .select({
          tableId: tables.tableId,
          position: tables.position,
          games: tables.games,
          won: tables.won,
          draw: tables.draw,
          lost: tables.lost,
          scoredGoals: tables.scoredGoals,
          concededGoals: tables.concededGoals,
          goalDifference: tables.goalDifference,
          points: tables.points,
          teamId: tables.teamId,
          teamName:
            teams.casualName as unknown as SQL<string>,
        })
        .from(tables)
        .leftJoin(teams, eq(tables.teamId, teams.teamId))
        .where(eq(tables.serieId, serieId))

      return {
        status: 200,

        defaultValues: seriesTable,
      }
    } catch (error) {
      catchError(error)
    }
  })
