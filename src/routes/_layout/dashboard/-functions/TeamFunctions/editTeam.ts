import { db } from '@/db'
import { teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editTeamObject } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const editTeam = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(editTeamObject))
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
