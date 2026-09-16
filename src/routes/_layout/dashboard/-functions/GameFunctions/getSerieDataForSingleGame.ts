import { db } from '@/db'
import { teamnames, teams, teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { eq } from 'drizzle-orm'

export const getSerieDataForSingleGame = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ serieId: zd.number().int().positive() }),
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

      const teamFromSeries = await db
        .select({
          team: {
            teamId: teams.teamId,
            name: teamnames.name,
            shortName: teamnames.shortName,
            casualName: teamnames.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseries)
        .leftJoin(
          teams,
          eq(teamseries.teamId, teams.teamId),
        )
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .where(eq(teamseries.serieId, serieId))
        .then((res) => {
          const teamArray = res
            .map((team) => {
              return {
                value: team.team.teamId,
                label: team.team.casualName,
              }
            })
            .concat({ value: 176, label: 'Ej bestämt' })

          return teamArray
        })

      return { status: 200, teams: teamFromSeries, serie }
    } catch (error) {
      catchError(error)
    }
  })
