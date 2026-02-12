import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { RecordStreakData } from '@/lib/types/records'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { getStreakData } from './getStreakData'

type RecordStreakReturn =
  | {
      status: 200
      streaks: RecordStreakData
      breadCrumb: string
      meta: { title: string; url: string; description: string }
    }
  | undefined

export const getStreakRecords = createServerFn({ method: 'GET' })
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
      const streakData = await getStreakData({ women })
      const breadCrumb = `Sviter ${women === true ? 'Damer' : 'Herrar'}`
      const title = `Bandyresultat - Sviter - ${women === true ? 'Damer' : 'Herrar'}`
      const url = `https://bandyresultat.se/maraton/records/streaks?women=${women}`
      const description = `Rekordsviter i bandyns Elitserie för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      return { status: 200, streaks: { ...streakData }, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
