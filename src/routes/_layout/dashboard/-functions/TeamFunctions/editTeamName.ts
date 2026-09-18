import { db } from '@/db'
import { teamnames } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editTeamNameObject } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const editTeamName = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(editTeamNameObject)
  .handler(async ({ data }) => {
    try {
      const teamName = await db.transaction(async (tx) => {
        const [returnTeam] = await tx
          .update(teamnames)
          .set(data)
          .where(eq(teamnames.teamnameId, data.teamnameId))
          .returning({ name: teamnames.name })

        return returnTeam.name
      })

      if (!teamName) {
        throw new Error('Lagnamnet hittas inte.')
      }

      return {
        status: 200,
        message: `Information om ${teamName} ändrades.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
