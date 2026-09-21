import { db } from '@/db'
import { teamlogos, teamnames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { asc, eq, getTableColumns } from 'drizzle-orm'

export const getAllTeamNames = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const teamNameObjects = await db
        .select({
          ...getTableColumns(teamnames),
          logo: { ...getTableColumns(teamlogos) },
        })
        .from(teamnames)
        .leftJoin(
          teamlogos,
          eq(teamlogos.logoId, teamnames.logoId),
        )
        .orderBy(asc(teamnames.casualName))

      return { status: 200, teamName: teamNameObjects }
    } catch (error) {
      catchError(error)
    }
  })
