import type { TeamBase } from './team'

export type CompareBaseTable = {
  teamId: number
  totalGames: number
  totalPoints: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalWins: number
  totalDraws: number
  totalLost: number
  team: TeamBase
}

export type CompareCatTableRow = CompareBaseTable & {
  opponentId: number
  category: string
  opponent: TeamBase
  serie: {
    level: number
  }
}

export type CompareAllTableRow = CompareBaseTable & {
  opponentId: number
  opponent: TeamBase
}

export type CompareCategoryData = Array<{
  level: string
  levelName: string
  tables: Array<{
    category: string
    tables: Array<CompareCatTableRow>
  }>
}>

export type CompareSeasonStat = {
  teamId: number
  data: number
  team: {
    name: string
    casualName: string
  }
}

export type CompareGameStat = {
  gameId: number
  result: string | null
  homeName: string | null
  awayName: string | null
  date: string
  rankedFirstGames: number
  rankedLastGames: number
}

export type CompareLatestWinStats = {
  gameId: number
  result: string | null
  homeName: string | null
  awayName: string | null
  date: string

}