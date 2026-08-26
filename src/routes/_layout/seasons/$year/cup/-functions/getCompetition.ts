import { db } from '@/db'
import { competitions, seasons } from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, eq, getTableColumns } from 'drizzle-orm'

type CompetitionReturn =
  | {
      status: 200
      competition: typeof competitions.$inferSelect
    }
  | { status: 404; message: string }
  | undefined

export const getCompetition = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      competitionName: zd
        .string()
        .transform((val) => val.replaceAll('_', ' ')),
      seasonYear: zd.string(),
      women:zd.boolean()
    }),
  )
  .handler(
    async ({
      data: { competitionName, seasonYear,women },
    }): Promise<CompetitionReturn> => {
      try {
        const competition = await db
          .select({ ...getTableColumns(competitions) })
          .from(competitions)
          .leftJoin(seasons, eq(competitions.seasonId,seasons.seasonId))
          .where(
            and(
              eq(seasons.year, seasonYear),
              eq(seasons.women,women),
              eq(
                competitions.competitionName,
                competitionName,
              ),
              eq(competitions.isCup, true),
            ),
          )
          .then((res) => {
            if (res.length === 0) return undefined
            return res[0]
          })

        if (!competition) {
          throw new Error404({
            message: `Ingen cup med namnet ${competitionName} denna säsong.`,
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
