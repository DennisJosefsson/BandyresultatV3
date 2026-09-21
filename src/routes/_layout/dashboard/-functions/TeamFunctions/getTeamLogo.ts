import { db } from '@/db'
import { teamlogos } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const getTeamLogo = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(zd.object({ logoId: zd.int() }))
  .handler(async ({ data: { logoId } }) => {
    try {
      const teamLogoObject = await db
        .select()
        .from(teamlogos)
        .where(eq(teamlogos.logoId, logoId))
        .then((res) => {
          if (res.length === 0) return undefined
          return res[0]
        })

      return teamLogoObject
    } catch (error) {
      catchError(error)
    }
  })
