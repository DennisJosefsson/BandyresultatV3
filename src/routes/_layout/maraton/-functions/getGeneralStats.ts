import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { GeneratStats } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getGeneralStatsData } from './getGeneralStatsData'

type RecordStreakReturn =
  | {
      status: 200
      generalStats: GeneratStats
      breadCrumb: string
      meta: { title: string; url: string; description: string }
    }
  | undefined

export const getGeneralStats = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        women: zd.boolean(),
      }),
    ),
  )
  .handler(async ({ data: { women } }): Promise<RecordStreakReturn> => {
    try {
      const generalStatsData = await getGeneralStatsData({ women })
      const breadCrumb = `Statistik ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Statistik Elitserien - ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/records/stats?women=${women}`
      const description = `Statistik för bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      return {
        status: 200,
        generalStats: { ...generalStatsData },
        breadCrumb,
        meta,
      }
    } catch (error) {
      catchError(error)
    }
  })
