import { db } from '@/db'
import { teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const deleteTeamSeason = createServerFn({
  method: 'POST',
})
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ teamseasonId: zd.number().int().positive() })),
  )
  .handler(async ({ data: { teamseasonId } }) => {
    try {
      await db
        .delete(teamseasons)
        .where(eq(teamseasons.teamseasonId, teamseasonId))

      return { status: 200, message: 'Teamseason borttagen.' }
    } catch (error) {
      catchError(error)
    }
  })
