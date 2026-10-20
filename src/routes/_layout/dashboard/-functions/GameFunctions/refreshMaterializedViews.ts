import { db } from '@/db'
import { mvSeriesStats } from '@/db/views/seasonStatsViews'
import { mvSeriesGames } from '@/db/views/seriesGamesViews'
import { mvSeriesTablesV2 } from '@/db/views/seriesTablesViews'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'

export const refreshMaterializedGroupViews =
  createServerFn()
    .middleware([authMiddleware, errorMiddleware])
    .handler(async () => {
      try {
        await db.transaction(async (tx) => {
          await tx
            .refreshMaterializedView(mvSeriesGames)
            .concurrently()
          await tx
            .refreshMaterializedView(mvSeriesTablesV2)
            .concurrently()
          await tx
            .refreshMaterializedView(mvSeriesStats)
            .concurrently()
        })

        return {
          status: 200,
          message: 'Säsongsdata uppdaterad.',
        }
      } catch (error) {
        catchError(error)
      }
    })
