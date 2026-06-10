import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { playoffSeasonObject } from '@/lib/types/playoffseason'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { playoffseason } from '@/db/schema'
import { db } from '@/db'

export const updatePlayoffSeason = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(playoffSeasonObject))
  .handler(async ({ data: { playoffSeasonId, ...rest } }) => {
    try {
      await db
        .update(playoffseason)
        .set(rest)
        .where(eq(playoffseason.playoffSeasonId, playoffSeasonId))

      return {
        status: 200,
        message: 'PlayoffSeason uppdaterad.',
      }
    } catch (error) {
      catchError(error)
    }
  })
