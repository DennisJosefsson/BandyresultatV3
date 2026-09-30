import { db } from '@/db'
import { teamlogos } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { max } from 'drizzle-orm'

export const getNewTeamLogoId = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const [logoId] = await db
        .select({ max: max(teamlogos.logoId) })
        .from(teamlogos)

      if (!logoId.max) {
        throw new Error('Inget max-värde hittades')
      }

      return logoId.max + 1
    } catch (error) {
      catchError(error)
    }
  })
