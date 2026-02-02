import { db } from '@/db'
import { teamseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'

export const addTeamToSerie = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(
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
