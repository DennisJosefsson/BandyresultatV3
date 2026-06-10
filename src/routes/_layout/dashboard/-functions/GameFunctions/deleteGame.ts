import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { games } from '@/db/schema'
import { db } from '@/db'

export const deleteGame = createServerFn({ method: 'POST' })
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(zd.object({ gameId: zd.number().positive().int() })))
  .handler(async ({ data: { gameId } }) => {
    try {
      await db.delete(games).where(eq(games.gameId, gameId))

      return { status: 200, message: 'Match borttagen.' }
    } catch (error) {
      catchError(error)
    }
  })
