import { db } from '@/db'
import { metadata, seasons, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { metadataObject } from '@/lib/types/metadata'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq } from 'drizzle-orm'

export const updateMetadata = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(metadataObject))
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

      await db
        .update(metadata)
        .set(newMetadata)
        .where(eq(metadata.metadataId, metadataId))

      return { status: 200, message: 'Metadata uppdaterad.' }
    } catch (error) {
      catchError(error)
    }
  })
