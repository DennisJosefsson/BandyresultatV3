import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { teamseasons } from '@/db/schema'
import { db } from '@/db'

export const deleteTeamSeason = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(
    zodValidator(
      zd.object({
        teamseasonId: zd.number().int().positive(),
      }),
    ),
  )
  .handler(async ({ data: { teamseasonId } }) => {
    try {
      await db.delete(teamseasons).where(eq(teamseasons.teamseasonId, teamseasonId))

      return {
        status: 200,
        message: 'Teamseason borttagen.',
      }
    } catch (error) {
      catchError(error)
    }
  })
