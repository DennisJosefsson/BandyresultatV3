import { db } from '@/db'
import { competitions } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const editCompetitionObject = zd.object({
  competitionId: zd.number(),
  competitionName: zd.string(),
  division: zd.number(),
  women: zd.boolean(),
  seasonId: zd.number(),
  isCup: zd.boolean().optional().nullable().default(false),
})

export const editCompetition = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(editCompetitionObject)
  .handler(
    async ({
      data: {
        competitionName,
        seasonId,
        women,
        division,
        isCup,
        competitionId,
      },
    }) => {
      try {
        const returnValue = await db
          .update(competitions)
          .set({
            division,
            competitionName,
            women,
            isCup,
            seasonId,
          })
          .where(
            eq(competitions.competitionId, competitionId),
          )
          .returning({
            competitionName: competitions.competitionName,
          })

        return {
          status: 200,
          message: `Turneringen ${returnValue[0].competitionName} uppdaterad`,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
