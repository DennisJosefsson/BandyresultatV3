import { db } from '@/db'
import { teamnames, teams, teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'

export const getTeamsForTeamseasonAddition = createServerFn(
  { method: 'GET' },
)
  .middleware([errorMiddleware])
  .validator(
    zd.object({ seasonId: zd.number().int().positive() }),
  )
  .handler(async ({ data: { seasonId } }) => {
    try {
      const allTeams = await db
        .select({
          ...getTableColumns(teams),
          team: {
            teamId: teams.teamId,
            name: teamnames.name,
            shortName: teamnames.shortName,
            casualName: teamnames.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teams)
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .orderBy(
          asc(sql`casual_name collate "se-SE-x-icu"`),
        )

      const teamSeasons = await db
        .select({
          ...getTableColumns(teamseasons),
          team: {
            teamId: teams.teamId,
            name: teamnames.name,
            shortName: teamnames.shortName,
            casualName: teamnames.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(teamseasons)
        .leftJoin(
          teams,
          eq(teamseasons.teamId, teams.teamId),
        )
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(
          asc(sql`teams.casual_name collate "se-SE-x-icu"`),
        )

      return { allTeams, teamSeasons }
    } catch (error) {
      catchError(error)
    }
  })
