import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { RecordDataArrays } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getConcededData } from './getConcededData'

type RecordStreakReturn =
  | {
      status: 200
      conceded: RecordDataArrays
      breadCrumb: string
      meta: { title: string; url: string; description: string }
    }
  | undefined

export const getConcededRecords = createServerFn({ method: 'GET' })
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
      const concededData = await getConcededData({ women })
      const breadCrumb = `Insläppta mål ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Rekord insläppta mål - ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/records/conceded?women=${women}`
      const description = `Rekord i antalet insläppta mål i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      return { status: 200, conceded: { ...concededData }, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
