import { db } from '@/db'
import { teamseasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'

type NewTeamseason = typeof teamseasons.$inferInsert

export const addTeamSeason = createServerFn({
  method: 'POST',
})
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        teamId: zd.number().int().positive(),
        seasonId: zd.number().int().positive(),
      }),
    ),
  )
  .handler(async ({ data: { teamId, seasonId } }) => {
    try {
      const newTeamseason: NewTeamseason = { teamId, seasonId }

      const teamSeason = await db
        .insert(teamseasons)
        .values(newTeamseason)
        .returning({ teamseasonId: teamseasons.teamseasonId })

      if (!teamSeason) throw new Error('Något gick fel.')
      return { status: 200, message: 'Teamseason inlagd.' }
    } catch (error) {
      catchError(error)
    }
  })
