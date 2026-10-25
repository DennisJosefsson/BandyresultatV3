import type { games } from '@/db/schema'
import { parseNewGameWithResult } from '@/routes/_layout/dashboard/-functions/dataParsers/parseGameResults'
import { zd } from '../utils/zod'
import type {
  TeamBaseWithLogo,
  TeamBaseWithTeamGameId,
} from './team'

export type Game = {
  gameId: number
  homeTeamId: number
  awayTeamId: number
  date: string
  group: string
  category: string
  result: string | null
  homeGoal: number | null
  awayGoal: number | null
  halftimeResult: string | null
  otResult: string | null
  played: boolean | null
  penalties: boolean | null
  extraTime: boolean | null
  women: boolean
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
  season: {
    seasonId: number
    year: string
  }
}

export type SeriesGamesV2 = {
  gameId: number
  date: string
  result: string | null
  otResult: string | null
  halftimeResult: string | null
  homeGoal: number | null
  awayGoal: number | null
  extraTime: boolean | null
  penalties: boolean | null
  played: boolean | null
  homeTeamId: number
  awayTeamId: number
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
}

export type TeamSeasonGame = Omit<
  typeof games.$inferSelect,
  | 'createdAt'
  | 'updatedAt'
  | 'halftimeHomeGoal'
  | 'halftimeAwayGoal'
  | 'playoff'
> & {
  home: TeamBaseWithLogo
} & { away: TeamBaseWithLogo }

export type TeamSeasonSerie = {
  serieName: string
  comment: string | null
  played: Array<TeamSeasonGame>
  unplayed: Array<TeamSeasonGame>
}

export type TeamSeasonCompetitionGames = {
  competitionName: string
  seriesArray: Array<TeamSeasonSerie>
}

export type InlineEditGame = typeof games.$inferSelect & {
  home: TeamBaseWithTeamGameId
  away: TeamBaseWithTeamGameId
}

export type GameGroupBase<T> = {
  group: string
  name: string
  comment: string | null
  level: number
  dates: Array<{
    date: string
    games: T
  }>
}

export type GroupGames = GameGroupBase<Array<Game>>

export type Games = {
  played: GameGroupBase<Array<Omit<Game, 'season'>>>
  unplayed: GameGroupBase<Array<Omit<Game, 'season'>>>
  playedLength: number
  unplayedLength: number
}

export type PlayoffGames = {
  played: Array<GameGroupBase<Array<Omit<Game, 'season'>>>>
  unplayed: Array<
    GameGroupBase<Array<Omit<Game, 'season'>>>
  >
  playedLength: number
  unplayedLength: number
}

export const generatedGameObject = zd
  .object({
    homeName: zd.string().optional(),
    awayName: zd.string().optional(),
    homeTeamId: zd.number().positive().int(),
    awayTeamId: zd.number().positive().int(),
    date: zd.iso.date(),
    played: zd.boolean(),
    playoff: zd.boolean(),
    women: zd.boolean(),
    serieId: zd.number().positive().int(),
    seasonId: zd.number().positive().int(),
  })
  .refine((val) => val.homeTeamId !== val.awayTeamId, {
    message: 'Lag-id kan inte vara samma.',
    path: ['awayTeamId'],
  })

export const generatedGameObjectArray = zd.object({
  gameArray: zd.array(generatedGameObject),
})

export const bulkResultsArray = zd.object({
  gameObjectsArray: zd.array(parseNewGameWithResult),
})

export type ParseNewGameWithResult = zd.infer<
  typeof parseNewGameWithResult
>

export const bulkGameFileParser = zd.array(
  zd.strictObject({
    date: zd.string(),
    homeTeamId: zd.coerce.number().positive().int(),
    awayTeamId: zd.coerce.number().positive().int(),
  }),
)

export type BulkGameFileParser = zd.infer<
  typeof bulkGameFileParser
>

export const bulkResultFileParser = zd.array(
  zd.object({
    homeTeamId: zd.number().int().positive(),
    awayTeamId: zd.number().int().positive(),
    result: zd.string().regex(/^\d{1,2}-\d{1,2}$/, {
      message: 'Fel resultatformat.',
    }),
    halftimeResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, {
        message: 'Fel resultatformat, halvtid.',
      })
      .or(zd.literal('')),
    otResult: zd
      .string()
      .regex(/^\d{1,2}-\d{1,2}$/, {
        message:
          'Fel resultatformat, övertid eller straffar.',
      })
      .or(zd.literal('')),
    date: zd.iso.date({ message: 'Fel datumformat.' }),
  }),
)

export type BulkResultFileParser = zd.infer<
  typeof bulkResultFileParser
>

export const submitGameResult = zd.object({
  gameId: zd.number().int().positive(),
  homeTeamId: zd.number().int().positive(),
  awayTeamId: zd.number().int().positive(),
  result: zd.string().regex(/^\d{1,2}-\d{1,2}$/, {
    message: 'Fel resultatformat.',
  }),
  halftimeResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, {
      message: 'Fel resultatformat, halvtid.',
    })
    .or(zd.literal('')),
  otResult: zd
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/, {
      message:
        'Fel resultatformat, övertid eller straffar.',
    })
    .or(zd.literal('')),
  date: zd.iso.date({ message: 'Fel datumformat.' }),
  extraTime: zd.boolean(),
  penalties: zd.boolean(),
  neutral: zd.boolean().default(false),
  women: zd.boolean(),
  homeTeamGameId: zd.number().int().positive(),
  awayTeamGameId: zd.number().int().positive(),
})

export type CompareGamesBase = typeof games.$inferSelect & {
  group: string
  category: string
  serie: { serieName: string }
  competition: { competitionName: string }
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
}

export type CompareGamesWithAge = CompareGamesBase & {
  age: string
}
