import { db } from '@/db'
import { teamnames, teams } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newTeam } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const addTeam = createServerFn({ method: 'POST' })
  .middleware([authMiddleware, errorMiddleware])
  .validator(newTeam)
  .handler(async ({ data }) => {
    try {
      const teamnameId = await db.transaction(
        async (tx) => {
          const returnTeam = await tx
            .insert(teams)
            .values(data)
            .returning()

          return returnTeam[0].teamnameId
        },
      )
      const teamName = await db
        .select({ teamName: teamnames.name })
        .from(teamnames)
        .where(eq(teamnames.teamnameId, teamnameId))
        .then((res) => {
          if (res.length === 0) return undefined
          return res[0].teamName
        })

      if (!teamName) {
        throw new Error('Lagnamnet hittas inte.')
      }

      return {
        status: 200,
        message: `Lag med namn ${teamName} lades till.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
