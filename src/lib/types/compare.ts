import type { TeamBase } from './team'

export type CompareBaseTable = {
  totalGames: number
  totalPoints: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalWins: number
  totalDraws: number
  totalLost: number
}

export type CompareCatTableRow = CompareBaseTable & {
  category: string
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
    categoryName: string
    tables: Array<CompareBaseTable>
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
  age: string
}
