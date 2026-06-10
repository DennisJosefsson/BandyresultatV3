import { asc, sql } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { teams } from '@/db/schema'
import { db } from '@/db'

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
