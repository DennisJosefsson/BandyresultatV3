import { zd } from '../utils/zod'

export const playoffSeasonObject = zd.object({
  playoffSeasonId: zd.number().positive().int(),
  seasonId: zd.number().positive().int(),
  women: zd.boolean(),
  playoffAsSeries: zd.boolean(),
  hasEight: zd.boolean(),
  hasQuarter: zd.boolean(),
  uefaSorting: zd.boolean(),
})
