import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { teamseries } from '@/db/schema'
import { db } from '@/db'

export const addTeamToSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(
    zodValidator(
      zd.object({
        teamId: zd.number().int().positive(),
        serieId: zd.number().int().positive(),
      }),
    ),
  )
  .handler(async ({ data: { teamId, serieId } }) => {
    try {
      await db.insert(teamseries).values({ teamId, serieId })

      return { status: 200, message: 'Lag tillagt' }
    } catch (error) {
      catchError(error)
    }
  })
