import { createServerFn } from '@tanstack/react-start'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { getNewSeasonData } from './getNewSeasonData'

export const generateNewSeason = createServerFn({
  method: 'GET',
})
  .middleware([authMiddleware, errorMiddleware])
  .handler(async () => {
    try {
      const year = await getNewSeasonData()

      return {
        status: 200,
        message: `Ny säsong ${year} skapad.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
