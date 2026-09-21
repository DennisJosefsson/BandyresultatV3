import { db } from '@/db'
import { seasons, teamseasons } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { and, between, eq, inArray } from 'drizzle-orm'

export const teamSeasonTeamNameObject = zd.object({
  teamId: zd.int(),
  teamnameId: zd.int(),
  firstSeason: zd.int(),
  lastSeason: zd.int(),
})

export const editTeamSeasonTeamName = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(teamSeasonTeamNameObject)
  .handler(
    async ({
      data: { teamId, teamnameId, firstSeason, lastSeason },
    }) => {
      try {
        const rowCount = await db.transaction(
          async (tx) => {
            const returnArray = await tx
              .update(teamseasons)
              .set({ teamnameId: teamnameId })
              .where(
                and(
                  eq(teamseasons.teamId, teamId),
                  inArray(
                    teamseasons.seasonId,
                    db
                      .select({
                        seasonId: seasons.seasonId,
                      })
                      .from(seasons)
                      .where(
                        between(
                          seasons.intYear,
                          firstSeason,
                          lastSeason,
                        ),
                      ),
                  ),
                ),
              )
              .returning()

            return returnArray.length
          },
        )

        if (rowCount === 0) {
          throw new Error('Ingen uppdatering')
        }

        return {
          status: 200,
          message: `${rowCount} säsonger ändrade.`,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
