import { db } from '@/db'
import { teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { asc, sql } from 'drizzle-orm'

export const getAllTeams = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const allTeams = await db
        .select()
        .from(teams)
        .orderBy(asc(sql`teams.casual_name collate "se-SE-x-icu"`))
      return { status: 200, teams: allTeams }
    } catch (error) {
      catchError(error)
    }
  })
