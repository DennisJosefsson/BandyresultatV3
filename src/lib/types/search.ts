import { zd } from '../utils/zod'
import { TeamBase } from './team'
import { Unpacked } from './unpacked'

export const clientSearchParams = zd.object({
  categoryArray: zd
    .array(
      zd.enum([
        'regular',
        'qualification',
        'playoffseries',
        'eight',
        'quarter',
        'semi',
        'final',
      ]),
    )
    .optional()
    .catch(undefined),
  order: zd.enum(['asc', 'desc']).optional().catch(undefined),
  limit: zd.number().optional().catch(undefined),
  result: zd.string().optional().catch(undefined),
  gameResult: zd
    .enum(['all', 'win', 'lost', 'draw'])
    .optional()
    .catch(undefined),
  goalsScored: zd
    .number({ message: 'Antal gjorda mål måste vara en siffra.' })
    .optional()
    .catch(undefined),
  goalsScoredOperator: zd
    .enum(['gte', 'lte', 'eq'])
    .optional()
    .catch(undefined),
  goalsConceded: zd.number().optional().catch(undefined),
  goalsConcededOperator: zd
    .enum(['gte', 'lte', 'eq'])
    .optional()
    .catch(undefined),
  goalDiff: zd.number().optional().catch(undefined),
  goalDiffOperator: zd.enum(['gte', 'lte', 'eq']).optional().catch(undefined),
  startSeason: zd
    .number({ message: 'Första säsong måste vara ett årtal.' })
    .optional()
    .catch(undefined),
  endSeason: zd
    .number({ message: 'Sista säsong måste vara ett årtal.' })
    .optional()
    .catch(undefined),
  teamId: zd.number().optional().catch(undefined),
  opponentId: zd.number().optional().catch(undefined),
  inputDate: zd.string().optional().catch(undefined),
  selectedGender: zd.enum(['all', 'men', 'women']).optional().catch(undefined),
  homeGame: zd.enum(['all', 'home', 'away']).optional().catch(undefined),
  orderVar: zd
    .enum([
      'date',
      'totalGoals',
      'goalDifference',
      'goalsScored',
      'goalsConceded',
    ])
    .optional()
    .catch(undefined),
  level: zd
    .array(zd.enum(['1.0', '1.5', '2.0', '2.5', '3.0']))
    .optional()
    .catch(undefined),
  submit: zd.boolean().optional().catch(undefined),
})

const searchParamsFields = clientSearchParams.keyof()

export type SearchParamsFields = zd.infer<typeof searchParamsFields>

const pickedTypes = clientSearchParams.pick({
  orderVar: true,
  order: true,
  goalsScoredOperator: true,
})

type PickedTypes = zd.infer<typeof pickedTypes>

const categories = clientSearchParams.pick({ categoryArray: true })

type Category = zd.infer<typeof categories>

export type OperatorValues = NonNullable<PickedTypes[keyof PickedTypes]>

export type Categories = Unpacked<NonNullable<Category[keyof Category]>>

export type SearchResult = {
  gameId: number
  result: string | null
  halftimeResult: string | null
  date: string | null
  qualificationGame: boolean | null
  home: TeamBase
  away: TeamBase
}
