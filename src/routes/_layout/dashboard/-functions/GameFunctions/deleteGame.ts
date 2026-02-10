import { db } from '@/db'
import { games } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const deleteGame = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ gameId: zd.number().positive().int() })),
  )
  .handler(async ({ data: { gameId } }) => {
    try {
      await db.delete(games).where(eq(games.gameId, gameId))

      return { status: 200, message: 'Match borttagen.' }
    } catch (error) {
      catchError(error)
    }
  })
