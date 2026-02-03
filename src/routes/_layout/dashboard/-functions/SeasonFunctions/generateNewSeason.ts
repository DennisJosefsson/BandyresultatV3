import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { getNewSeasonData } from './getNewSeasonData'

export const generateNewSeason = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const year = await getNewSeasonData()

      return { status: 200, message: `Ny säsong ${year} skapad.` }
    } catch (error) {
      catchError(error)
    }
  })
