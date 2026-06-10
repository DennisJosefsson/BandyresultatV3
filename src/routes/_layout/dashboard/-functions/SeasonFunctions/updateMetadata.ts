import { and, eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { metadataObject } from '@/lib/types/metadata'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { metadata, seasons, teams } from '@/db/schema'
import { db } from '@/db'

export const updateMetadata = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(metadataObject))
  .handler(async ({ data: { metadataId, ...rest } }) => {
    try {
      let winnerId = null
      if (rest.winnerName !== '') {
        winnerId = await db
          .select({ teamId: teams.teamId })
          .from(teams)
          .where(
            and(
              eq(teams.name, rest.winnerName),
              eq(
                teams.women,
                db
                  .select({ women: seasons.women })
                  .from(seasons)
                  .where(eq(seasons.seasonId, rest.seasonId)),
              ),
            ),
          )
          .then((res) => res[0].teamId)
      }

      const newMetadata = { winnerId, ...rest }

      await db.update(metadata).set(newMetadata).where(eq(metadata.metadataId, metadataId))

      return {
        status: 200,
        message: 'Metadata uppdaterad.',
      }
    } catch (error) {
      catchError(error)
    }
  })
