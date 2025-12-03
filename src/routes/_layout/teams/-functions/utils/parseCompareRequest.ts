import { seasons } from '@/db/schema'
import { zd } from '@/lib/zod'

type Season = typeof seasons.$inferSelect

export const parseCompareRequest = (
  object: unknown,
  season: Season | undefined,
) => {
  if (!season) {
    throw new Error('Missing season')
  }

  const maxId = season.seasonId

  const compareObject = zd.object({
    teamArray: zd
      .array(zd.number().int().positive(), {
        message: 'Måste ange minst två lag.',
      })
      .min(2, { message: 'Måste ange minst två lag.' })
      .max(4, { message: 'Får högst ange fyra lag.' }),
    categoryArray: zd
      .array(
        zd.enum([
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ]),
      )
      .min(1, { message: 'Måste ange minst en kategori.' })
      .catch(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final']),
    startSeason: zd.coerce.number().int().positive().catch(1),
    endSeason: zd.coerce.number().int().positive().catch(maxId),
  })

  const parsedObject = compareObject.safeParse(object)

  return parsedObject
}
