import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { editTeamObject } from '@/lib/types/team'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { teams } from '@/db/schema'
import { db } from '@/db'

export const editTeam = createServerFn({ method: 'POST' })
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(editTeamObject))
  .handler(async ({ data }) => {
    try {
      const returnTeam = await db
        .update(teams)
        .set(data)
        .where(eq(teams.teamId, data.teamId))
        .returning()

      return {
        status: 200,
        message: `Information om ${returnTeam[0].name} ändrades.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
