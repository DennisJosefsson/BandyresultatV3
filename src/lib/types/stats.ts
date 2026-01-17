import { Serie } from './serie'

export type GoalData = {
  goalsScoredTotal: number
  goalsScoredAvg: number
}

export type GameData = {
  winTotal: number
  winAvg: number
}

export type DrawData = {
  drawTotal: number
  drawAvg: number
}

export type StreakData = {
  teamId: number
  name: string
  gameCount: number
  startDate: string
  endDate: string
}

export type MaxMinGoals = {
  date: string
  result: string | null
  value: number
  home: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
  away: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
}

export type MaxMinDiffAndGoals = {
  value: number
  games: MaxMinGoals[]
}

export type Stats = {
  status: 200
  serie?: Serie | undefined
  gameCount: number
  goalData: GoalData
  homeGoalData: GoalData
  awayGoalData: GoalData
  homeGameData: GameData
  awayGameData: GameData
  drawData: DrawData
  winStreak: StreakData[]
  losingStreak: StreakData[]
  drawStreak: StreakData[]
  noWinStreak: StreakData[]
  unbeatenStreak: StreakData[]
  maxGoals: MaxMinDiffAndGoals
  minGoals: MaxMinDiffAndGoals
  maxDiff: MaxMinDiffAndGoals
}
