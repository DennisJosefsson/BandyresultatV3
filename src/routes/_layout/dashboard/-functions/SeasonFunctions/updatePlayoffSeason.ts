import { db } from '@/db'
import { playoffseason } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { playoffSeasonObject } from '@/lib/types/playoffseason'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const updatePlayoffSeason = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(playoffSeasonObject))
  .handler(async ({ data: { playoffSeasonId, ...rest } }) => {
    try {
      await db
        .update(playoffseason)
        .set(rest)
        .where(eq(playoffseason.playoffSeasonId, playoffSeasonId))

      return { status: 200, message: 'PlayoffSeason uppdaterad.' }
    } catch (error) {
      catchError(error)
    }
  })
