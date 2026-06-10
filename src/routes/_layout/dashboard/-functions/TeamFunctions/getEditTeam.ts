import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { teams } from '@/db/schema'
import { db } from '@/db'

export const getEditTeam = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(zodValidator(zd.object({ teamId: zd.number().int().positive() })))
  .handler(async ({ data: { teamId } }) => {
    try {
      const team = await db.select().from(teams).where(eq(teams.teamId, teamId))

      return { status: 200, team: team[0] }
    } catch (error) {
      catchError(error)
    }
  })
