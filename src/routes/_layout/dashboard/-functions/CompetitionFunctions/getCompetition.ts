import { db } from '@/db'
import type { competitions } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type GetCompetitionReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
    }
  | { status: 404; message: string }
  | undefined

export const getCompetition = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zd.object({ competitionId: zd.number() }))
  .handler(
    async ({
      data: { competitionId },
    }): Promise<GetCompetitionReturn> => {
      try {
        const competition =
          await db.query.competitions.findFirst({
            where: (competitionSchema, { eq }) =>
              eq(
                competitionSchema.competitionId,
                competitionId,
              ),
          })

        if (!competition) {
          throw new Error404({
            message: 'Competition saknas',
          })
        }
        return { status: 200, competition }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
