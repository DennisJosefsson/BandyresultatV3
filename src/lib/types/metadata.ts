import { zd } from '../utils/zod'

export const metadataObject = zd.object({
  metadataId: zd.number().int().positive(),
  seasonId: zd.number().int().positive(),
  name: zd.string(),
  year: zd.string(),
  winnerName: zd.string().or(zd.literal('')),
  hostCity: zd.string().or(zd.literal('')),
  finalDate: zd.iso.date().or(zd.literal('')),
  northSouth: zd.boolean(),
  multipleGroupStages: zd.boolean(),
  eight: zd.boolean(),
  quarter: zd.boolean(),
  semi: zd.boolean(),
  final: zd.boolean(),
  comment: zd.string().or(zd.literal('')),
})
