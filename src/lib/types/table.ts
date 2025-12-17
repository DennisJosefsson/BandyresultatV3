export type Base = {
  group: string
  teamId: number
  women: boolean
  season: {
    year: string
    seasonId: number
  }
  team: {
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
