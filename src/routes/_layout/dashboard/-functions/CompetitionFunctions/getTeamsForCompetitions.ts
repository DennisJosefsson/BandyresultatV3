import { db } from '@/db'
import {
  teamcompetitions,
  teams,
  teamseasons,
} from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { asc, eq, getTableColumns, sql } from 'drizzle-orm'

type ReturnType =
  | {
      status: 200
      teamsInSeason: Array<
        typeof teamseasons.$inferSelect & { team: TeamBase }
      >
      teamsInCompetition: Array<
        typeof teamcompetitions.$inferSelect & {
          team: TeamBase
        }
      >
    }
  | { status: 404; message: string }
  | undefined

export const getTeamsForCompetitions = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({ competitionId: zd.number().int() }),
  )
  .handler(
    async ({
      data: { competitionId },
    }): Promise<ReturnType> => {
      try {
        const competition =
          await db.query.competitions.findFirst({
            where: (competitionsSchema, { eq: EQ }) =>
              EQ(
                competitionsSchema.competitionId,
                competitionId,
              ),
          })

        if (!competition) {
          throw new Error404({
            message: 'Turneringen finns inte.',
          })
        }

        const teamsInCompetition = await db
          .select({
            ...getTableColumns(teamcompetitions),
            team: {
              teamId: teams.teamId,
              name: teams.name,
              shortName: teams.shortName,
              casualName: teams.casualName,
            } as unknown as SQL<TeamBase>,
          })
          .from(teamcompetitions)
          .leftJoin(
            teams,
            eq(teams.teamId, teamcompetitions.teamId),
          )
          .where(
            eq(
              teamcompetitions.competitionId,
              competitionId,
            ),
          )
          .orderBy(
            asc(
              sql`teams.casual_name collate "se-SE-x-icu"`,
            ),
          )

        const teamsInSeason = await db
          .select({
            ...getTableColumns(teamseasons),
            team: {
              teamId: teams.teamId,
              name: teams.name,
              shortName: teams.shortName,
              casualName: teams.casualName,
            } as unknown as SQL<TeamBase>,
          })
          .from(teamseasons)
          .leftJoin(
            teams,
            eq(teams.teamId, teamseasons.teamId),
          )
          .where(
            eq(teamseasons.seasonId, competition.seasonId),
          )
          .orderBy(
            asc(
              sql`teams.casual_name collate "se-SE-x-icu"`,
            ),
          )

        return {
          status: 200,
          teamsInSeason,
          teamsInCompetition,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
