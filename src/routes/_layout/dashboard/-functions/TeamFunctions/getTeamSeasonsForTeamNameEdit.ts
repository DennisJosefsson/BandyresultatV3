import { db } from '@/db'
import { seasons, teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { asc, eq } from 'drizzle-orm'

export const getTeamSeasonsForTeamNameEdit = createServerFn(
  { method: 'GET' },
)
  .middleware([errorMiddleware])
  .validator(zd.object({ teamId: zd.int() }))
  .handler(async ({ data: { teamId } }) => {
    try {
      const teamSeasonArray = await db
        .select({
          intYear:
            seasons.intYear as unknown as SQL<number>,
        })
        .from(teamseasons)
        .leftJoin(
          seasons,
          eq(teamseasons.seasonId, seasons.seasonId),
        )
        .where(eq(teamseasons.teamId, teamId))
        .orderBy(asc(seasons.intYear))

      return teamSeasonArray
    } catch (error) {
      catchError(error)
    }
  })
