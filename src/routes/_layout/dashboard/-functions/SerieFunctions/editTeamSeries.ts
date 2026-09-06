import { db } from '@/db'
import { teamseries } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editTeamSeriesArray } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const editTeamSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(editTeamSeriesArray)
  .handler(async ({ data: { teamserie } }) => {
    try {
      if (teamserie.length === 0) {
        throw new Error('TeamserieArray måste ha data.')
      }

      const queries = teamserie.map((ts) => {
        const { teamseriesId, ...rest } = ts
        return db
          .update(teamseries)
          .set(rest)
          .where(eq(teamseries.teamseriesId, teamseriesId))
      })

      await Promise.all(queries)

      return {
        status: 200,
        message: 'TeamSerie uppdaterade.',
      }
    } catch (error) {
      catchError(error)
    }
  })
