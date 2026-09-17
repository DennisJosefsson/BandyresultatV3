import { db } from '@/db'
import { teamlogos, teamnames, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'

export const getAllTeams = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const allTeams = await db
        .select({
          ...getTableColumns(teams),
          teamname: {
            ...getTableColumns(teamnames),
            teamId: teams.teamId,
            logo: { ...getTableColumns(teamlogos) },
          } as unknown as SQL<TeamBaseWithLogo>,
        })
        .from(teams)
        .leftJoin(
          teamnames,
          eq(teamnames.teamnameId, teams.teamnameId),
        )
        .leftJoin(
          teamlogos,
          eq(teamlogos.logoId, teamnames.logoId),
        )
        .orderBy(
          asc(sql`teams.casual_name collate "se-SE-x-icu"`),
        )
      return { status: 200, teams: allTeams }
    } catch (error) {
      catchError(error)
    }
  })
