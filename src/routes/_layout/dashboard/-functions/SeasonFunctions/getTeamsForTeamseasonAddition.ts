import type { SQL } from 'drizzle-orm'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { teams, teamseasons } from '@/db/schema'
import { db } from '@/db'

export const getTeamsForTeamseasonAddition = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(zodValidator(zd.object({ seasonId: zd.number().int().positive() })))
  .handler(async ({ data: { seasonId } }) => {
    try {
      const allTeams = await db
        .select()
        .from(teams)
        .orderBy(asc(sql`casual_name collate "se-SE-x-icu"`))

      const teamSeasons = await db
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
        .leftJoin(teams, eq(teamseasons.teamId, teams.teamId))
        .where(eq(teamseasons.seasonId, seasonId))
        .orderBy(asc(sql`teams.casual_name collate "se-SE-x-icu"`))

      return { allTeams, teamSeasons }
    } catch (error) {
      catchError(error)
    }
  })
