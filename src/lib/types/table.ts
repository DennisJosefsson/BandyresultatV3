export type Base = {
  group: string
  teamId: number
  women: boolean
  season: {
    year: string
    seasonId: number
  }
  team: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
}

export type TeamTable = Base & {
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

export type GroupTable = {
  group: string
  name: string
  comment: string
  serieStructure: number[]
  level: number
  tables: TeamTable[]
}

export type MaratonTable = Omit<TeamTable, 'season' | 'women' | 'group'> & {
  seasons: number
}

export type DevDataTableItem = Omit<TeamTable, 'season' | 'women' | 'group'> & {
  position: number
  date: string
}
export type ReturnDevDataTableItem = DevDataTableItem & {
  arrowDirection: 'up' | 'down' | null
}

export type PlayoffTable = Omit<TeamTable, 'women' | 'season'> & {
  awayGoals: number
}

export type GroupPlayoffTable = {
  group: string
  result: string
  homeTeam: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
  awayTeam: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
  tables: PlayoffTable[]
}

export type PlayoffSeriesTable = {
  group: string
  tables: PlayoffTable[]
  comment: string | null
  serieStructure: number[] | null
  name: string
}
