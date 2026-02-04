import { db } from '@/db'
import { teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const getEditTeam = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ teamId: zd.number().int().positive() })),
  )
  .handler(async ({ data: { teamId } }) => {
    try {
      const team = await db.select().from(teams).where(eq(teams.teamId, teamId))

      return { status: 200, team: team[0] }
    } catch (error) {
      catchError(error)
    }
  })
