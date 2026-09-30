import { db } from '@/db'
import { teamnames } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { addTeamNameObject } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'

export const addTeamName = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(addTeamNameObject)
  .handler(async ({ data }) => {
    try {
      const teamName = await db.transaction(async (tx) => {
        const [returnTeam] = await tx
          .insert(teamnames)
          .values(data)
          .returning({ name: teamnames.name })

        return returnTeam.name
      })

      if (!teamName) {
        throw new Error('Lagnamnet hittas inte.')
      }

      return {
        status: 200,
        message: `Lagnamn ${teamName} lades till.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
