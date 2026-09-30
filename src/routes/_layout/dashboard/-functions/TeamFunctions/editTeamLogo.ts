import { db } from '@/db'
import { teamlogos } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { editTeamLogoObject } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const editTeamLogo = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(editTeamLogoObject)
  .handler(async ({ data }) => {
    try {
      const logoId = await db.transaction(async (tx) => {
        const [returnValue] = await tx
          .update(teamlogos)
          .set(data)
          .where(eq(teamlogos.teamlogoId, data.teamlogoId))
          .returning({ logoId: teamlogos.logoId })

        return returnValue.logoId
      })

      if (!logoId) {
        throw new Error('Logo-id finns inte.')
      }

      return {
        status: 200,
        message: `TeamLogo med logoId ${logoId} ändrades.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
