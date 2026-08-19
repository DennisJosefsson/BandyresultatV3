import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

export const getCompetitionForEditObject = zd.object({
  competitionId: zd.number(),
})

export const getCompetitionForEdit = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(getCompetitionForEditObject)
  .handler(async ({ data: { competitionId } }) => {
    try {
      const competition =
        await db.query.competitions.findFirst({
          where: (competitions, { eq }) =>
            eq(competitions.competitionId, competitionId),
        })
      if (!competition) {
        return {
          status: 404,
          message: 'Turneringen finns inte.',
        }
      }
      return {
        status: 200,
        competition,
      }
    } catch (error) {
      catchError(error)
    }
  })
