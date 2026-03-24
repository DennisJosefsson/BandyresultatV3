import { createServerFn } from '@tanstack/react-start'

import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'

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
