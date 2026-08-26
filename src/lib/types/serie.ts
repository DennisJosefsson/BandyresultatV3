import type { series } from '@/db/schema'
import { zd } from '../utils/zod'

export type Serie = typeof series.$inferSelect

export const categoryEnum = zd.enum([
  'qualification',
  'regular',
  'playoffseries',
  'eight',
  'quarter',
  'semi',
  'bronze',
  'final',
])

export const cupCategoryEnum = zd.enum([
  'cup-qualification',
  'cup-regular',
  'cup-playoffseries',
  'cup-eight',
  'cup-quarter',
  'cup-semi',
  'cup-bronze',
  'cup-final',
])

export const inputNewSeriesObject = zd.object({
  seasonId: zd.number().int().positive(),
  group: zd.string().min(2, 'Måste ange en gruppkod.'),
  category: zd.string(),
  serieName: zd
    .string()
    .min(5, 'Måste ange ett gruppnamn.'),
  serieStructure: zd
    .array(zd.number().int().positive())
    .optional(),
  comment: zd.string().optional(),
  level: zd.number().positive(),
  division: zd.number().positive(),
  hasMix: zd.boolean().default(false).optional(),
  hasStatic: zd.boolean().default(false).optional(),
  hasParent: zd.boolean().default(false).optional(),
  allParentGames: zd.boolean().default(false).optional(),
  uefaSorting: zd.boolean().default(false).optional(),
  competitionId: zd.number(),
})

export const inputEditSeriesObject =
  inputNewSeriesObject.extend({
    serieId: zd.number().int().positive(),
  })

export const newSeriesObject = zd.object({
  seasonId: zd.number().int().positive(),
  group: zd.string().min(2, 'Måste ange en gruppkod.'),
  category: categoryEnum,
  serieName: zd
    .string()
    .min(5, 'Måste ange ett gruppnamn.'),
  serieStructure: zd
    .array(zd.number().int().positive())
    .optional(),
  comment: zd.string().optional(),
  level: zd.number().positive(),
  division: zd.number().positive(),
  hasMix: zd.boolean().default(false).optional(),
  hasStatic: zd.boolean().default(false).optional(),
  hasParent: zd.boolean().default(false).optional(),
  allParentGames: zd.boolean().default(false).optional(),
  uefaSorting: zd.boolean().default(false).optional(),
  competitionId: zd.number(),
})

export const editSeriesObject = newSeriesObject.extend({
  serieId: zd.number().int().positive(),
})

export const newCupSeriesObject = zd.object({
  seasonId: zd.number().int().positive(),
  group: zd.string().min(2, 'Måste ange en gruppkod.'),
  category: cupCategoryEnum,
  serieName: zd
    .string()
    .min(5, 'Måste ange ett gruppnamn.'),
  serieStructure: zd
    .array(zd.number().int().positive())
    .optional(),
  comment: zd.string().optional(),
  level: zd.number().positive(),
  division: zd.number().positive(),
  hasMix: zd.boolean().default(false).optional(),
  hasStatic: zd.boolean().default(false).optional(),
  hasParent: zd.boolean().default(false).optional(),
  allParentGames: zd.boolean().default(false).optional(),
  uefaSorting: zd.boolean().default(false).optional(),
  competitionId: zd.number(),
})

export const editCupSeriesObject =
  newCupSeriesObject.extend({
    serieId: zd.number().int().positive(),
  })

export const newParentSerieObject = zd.object({
  parentId: zd.number().int().positive(),
  childId: zd.number().int().positive(),
})

export const editParentSerieObject = zd.object({
  id: zd.number().int().positive(),
  parentId: zd.number().int().positive(),
  childId: zd.number().int().positive(),
})

export const editParentSerieObjectArray = zd.object({
  parentSeries: zd.array(editParentSerieObject),
})

export const editTeamSeriesObject = zd.object({
  teamseriesId: zd.number().int().positive(),
  bonusPoints: zd.number().int(),
})

export const editTeamSeriesArray = zd.object({
  teamserie: zd.array(editTeamSeriesObject),
})
