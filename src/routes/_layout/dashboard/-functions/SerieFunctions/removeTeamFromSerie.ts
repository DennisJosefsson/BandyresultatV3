import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { teamseries } from '@/db/schema'
import { db } from '@/db'

export const removeTeamFromSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(
    zodValidator(
      zd.object({
        teamseriesId: zd.number().int().positive(),
      }),
    ),
  )
  .handler(async ({ data: { teamseriesId } }) => {
    try {
      await db.delete(teamseries).where(eq(teamseries.teamseriesId, teamseriesId))

      return { status: 200, message: 'Lag borttaget' }
    } catch (error) {
      catchError(error)
    }
  })
