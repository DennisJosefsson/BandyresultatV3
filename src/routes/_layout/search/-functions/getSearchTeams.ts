import { db } from '@/db'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { asc, sql } from 'drizzle-orm'

export const getSearchTeams = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    const teams = await db.query.teams.findMany({
      columns: { teamId: true, name: true, casualName: true, women: true },
      where: (teams, { ne }) => ne(teams.teamId, 176),
      orderBy: [asc(sql`casual_name collate "se-SE-x-icu"`)],
    })

    return teams
  })
