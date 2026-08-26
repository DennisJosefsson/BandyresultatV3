import { db } from '@/db'
import { competitions } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'

export const addCompetitionObject = z.object({
  competitionName: z.string(),
  division: z.number(),
  women: z.boolean(),
  seasonId: z.number(),
  isCup: z.boolean().optional().default(false),
})

export const addCompetition = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(addCompetitionObject)
  .handler(
    async ({
      data: {
        competitionName,
        seasonId,
        women,
        division,
        isCup,
      },
    }) => {
      try {
        const exists =
          await db.query.competitions.findFirst({
            where: (competitionsSchema, { and, eq }) =>
              and(
                eq(
                  competitionsSchema.competitionName,
                  competitionName,
                ),
                eq(competitionsSchema.seasonId, seasonId),
              ),
          })

        if (exists) {
          throw new Error('Turneringen finns redan.')
        }

        const returnValue = await db
          .insert(competitions)
          .values({
            division,
            competitionName,
            women,
            isCup,
            seasonId,
          })
          .returning({
            competitionName: competitions.competitionName,
          })

        return {
          status: 200,
          message: `Turneringen ${returnValue[0].competitionName} inlagd`,
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('Turneringen finns redan.')
        ) {
          throw error
        }
        catchError(error)
      }
    },
  )
