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
