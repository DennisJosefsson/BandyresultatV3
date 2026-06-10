import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { newTeam } from '@/lib/types/team'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { teams } from '@/db/schema'
import { db } from '@/db'

export const addTeam = createServerFn({ method: 'POST' })
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(newTeam))
  .handler(async ({ data }) => {
    try {
      const returnTeam = await db.insert(teams).values(data).returning()

      return {
        status: 200,
        message: `${returnTeam[0].name} lades till.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
