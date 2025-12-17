import { db } from '@/db'
import { seasons, teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { desc, eq, SQL } from 'drizzle-orm'

export const getTeamSeasons = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(zd.number()))
  .middleware([errorMiddleware])
  .handler(async ({ data: teamId }) => {
    try {
      const teamSeasons = await db
        .select({
          year: seasons.year as unknown as SQL<string>,
        })
        .from(teamseasons)
        .leftJoin(seasons, eq(teamseasons.seasonId, seasons.seasonId))
        .where(eq(teamseasons.teamId, teamId))
        .orderBy(desc(teamseasons.seasonId))
        .then((res) => {
          return res.map((item) => {
            return {
              seasonId: item.year.includes('/')
                ? parseInt(item.year.split('/')[1])
                : parseInt(item.year),
              year: item.year,
            }
          })
        })

      if (!teamSeasons || teamSeasons.length === 0) {
        throw notFound()
      }
      if (teamSeasons.length > 10) {
        const copy = [...teamSeasons]
        const head = copy.splice(0, 8)
        return {
          seasons: head,
          rest: copy,
        }
      } else {
        return { seasons: teamSeasons, rest: [] }
      }
    } catch (error) {
      catchError(error)
    }
  })
