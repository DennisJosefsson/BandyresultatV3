import { db } from '@/db'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

export const getAllSeasonCompetitionsObject = zd.object({
  seasonId: zd.number(),
})

export const getAllSeasonCompetitions = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(getAllSeasonCompetitionsObject)
  .handler(async ({ data: { seasonId } }) => {
    try {
      const competitionsArray =
        await db.query.competitions.findMany({
          where: (competitions, { eq }) =>
            eq(competitions.seasonId, seasonId),
        })
      if (competitionsArray.length === 0) {
        return {
          status: 404,
          message: 'Finns inga turneringar.',
        }
      }
      return {
        status: 200,
        competitions: competitionsArray,
      }
    } catch (error) {
      catchError(error)
    }
  })
