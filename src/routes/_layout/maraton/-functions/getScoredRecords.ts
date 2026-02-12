import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { GoalRecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getScoredData } from './getScoredData'

type RecordStreakReturn =
  | {
      status: 200
      scored: GoalRecordDataArrays
      breadCrumb: string
      meta: { title: string; url: string; description: string }
    }
  | undefined

export const getScoredRecords = createServerFn({ method: 'GET' })
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
      const scoredData = await getScoredData({ women })
      const breadCrumb = `Gjorda mål ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Rekord gjorda mål - ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/records/scored?women=${women}`
      const description = `Rekord i antalet gjorda mål i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      return { status: 200, scored: { ...scoredData }, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
