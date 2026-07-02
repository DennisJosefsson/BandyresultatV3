import { db } from '@/db'
import { teams } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newTeam } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'

export const addTeam = createServerFn({ method: 'POST' })
  .middleware([authMiddleware, errorMiddleware])
  .validator(newTeam)
  .handler(async ({ data }) => {
    try {
      const returnTeam = await db
        .insert(teams)
        .values(data)
        .returning()

      return {
        status: 200,
        message: `${returnTeam[0].name} lades till.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
