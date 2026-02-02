import { db } from '@/db'
import { teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const removeTeamFromSerie = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        teamseriesId: zd.number().int().positive(),
      }),
    ),
  )
  .handler(async ({ data: { teamseriesId } }) => {
    try {
      await db
        .delete(teamseries)
        .where(eq(teamseries.teamseriesId, teamseriesId))

      return { status: 200, message: 'Lag borttaget' }
    } catch (error) {
      catchError(error)
    }
  })
