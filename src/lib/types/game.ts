import { zd } from '../utils/zod'

export type Game = {
  gameId: number
  homeTeamId: number
  awayTeamId: number
  date: string
  group: string
  category: string
  result: string | null
  halftimeResult: string | null
  played: boolean | null
  home: {
    teamId: number
    name: string
    casualName: string
    shortName: string
  }
  away: {
    teamId: number
    name: string
    casualName: string
    shortName: string
  }
  season: {
    seasonId: number
    year: string
  }
}

export type GameGroupBase<T> = {
  group: string
  name: string
  comment: string | null
  level: number
  dates: {
    date: string
    games: T
  }[]
}

export type GroupGames = GameGroupBase<Game[]>

export type Games = {
  played: GameGroupBase<Omit<Game, 'season'>[]>
  unplayed: GameGroupBase<Omit<Game, 'season'>[]>
  playedLength: number
  unplayedLength: number
}

export type PlayoffGames = {
  played: GameGroupBase<Omit<Game, 'season'>[]>[]
  unplayed: GameGroupBase<Omit<Game, 'season'>[]>[]
  playedLength: number
  unplayedLength: number
}

export const generatedGameObject = zd.object({
  homeName: zd.string().optional(),
  awayName: zd.string().optional(),
  homeTeamId: zd.number().positive().int(),
  awayTeamId: zd.number().positive().int(),
  date: zd.iso.date(),
  group: zd.string(),
  category: zd.string(),
  played: zd.boolean(),
  playoff: zd.boolean(),
  women: zd.boolean(),
  serieId: zd.number().positive().int(),
  seasonId: zd.number().positive().int(),
})

export const generatedGameObjectArray = zd.object({
  gameArray: zd.array(generatedGameObject),
})

export const bulkGameFileParser = zd.array(
  zd.object({
    date: zd.string(),
    homeTeamId: zd.number().positive().int(),
    awayTeamId: zd.number().positive().int(),
  }),
)

export type BulkGameFileParser = zd.infer<typeof bulkGameFileParser>

export const submitGameResult = zd.object({
  gameId: zd.number().int().positive(),
  homeTeamId: zd.number().int().positive(),
  awayTeamId: zd.number().int().positive(),
  result: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat.' }),
  halftimeResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Fel resultatformat, halvtid.' })
    .or(zd.literal('')),
  otResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, {
      message: 'Fel resultatformat, övertid eller straffar.',
    })
    .or(zd.literal('')),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  extraTime: zd.boolean(),
  penalties: zd.boolean(),
  women: zd.boolean(),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})
