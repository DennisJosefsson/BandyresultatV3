import { db } from '@/db'
import { teamlogos } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const getTeamLogoByUUIDV4 = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(zd.object({ teamlogoId: zd.uuidv4() }))
  .handler(async ({ data: { teamlogoId } }) => {
    try {
      const teamLogoObject = await db
        .select()
        .from(teamlogos)
        .where(eq(teamlogos.teamlogoId, teamlogoId))
        .then((res) => {
          if (res.length === 0) return undefined
          return res[0]
        })

      return teamLogoObject
    } catch (error) {
      catchError(error)
    }
  })
