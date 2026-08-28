import { db } from '@/db'
import { teamcompetitions } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const removeTeamFromCompetition = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(
    zd.object({
      teamCompetitionId: zd.number().int().positive(),
    }),
  )
  .handler(async ({ data: { teamCompetitionId } }) => {
    try {
      await db
        .delete(teamcompetitions)
        .where(
          eq(
            teamcompetitions.teamCompetitionId,
            teamCompetitionId,
          ),
        )

      return { status: 200, message: 'Lag borttaget' }
    } catch (error) {
      catchError(error)
    }
  })
