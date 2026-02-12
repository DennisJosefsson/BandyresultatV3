import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { RecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getPointData } from './getPointData'

type RecordStreakReturn =
  | {
      status: 200
      points: RecordDataArrays
      breadCrumb: string
      meta: { title: string; url: string; description: string }
    }
  | undefined

export const getPointRecords = createServerFn({ method: 'GET' })
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
      const pointsData = await getPointData({ women })
      const breadCrumb = `Poäng ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Poängrekord - ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/records/points?women=${women}`
      const description = `Poängrekord i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      return { status: 200, points: { ...pointsData }, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
