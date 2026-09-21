import { db } from '@/db'
import { teamnames } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const getTeamName = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(zd.object({ teamnameId: zd.int() }))
  .handler(async ({ data: { teamnameId } }) => {
    try {
      const teamNameObject = await db
        .select()
        .from(teamnames)
        .where(eq(teamnames.teamnameId, teamnameId))
        .then((res) => {
          if (res.length === 0) return undefined
          return res[0]
        })
      if (!teamNameObject) {
        return {
          teamnameId,
          name: 'Finns inget sådant lag',
          casualName: '',
          shortName: '',
          logoId: null,
        }
      }
      return teamNameObject
    } catch (error) {
      catchError(error)
    }
  })
