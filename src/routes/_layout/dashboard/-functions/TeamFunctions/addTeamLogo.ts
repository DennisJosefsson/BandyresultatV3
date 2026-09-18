import { db } from '@/db'
import { teamlogos } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { addTeamLogoObject } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'

export const addTeamLogo = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(addTeamLogoObject)
  .handler(async ({ data }) => {
    try {
      const logoId = await db.transaction(async (tx) => {
        const [returnValue] = await tx
          .insert(teamlogos)
          .values(data)
          .returning({ logoId: teamlogos.logoId })

        return returnValue.logoId
      })

      if (!logoId) {
        throw new Error('Ingen logoId')
      }

      return {
        status: 200,
        message: `Ny logga med logoId ${logoId} inlagd.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
