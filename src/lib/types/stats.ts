import type { Serie } from './serie'
import type { TeamBaseWithLogo } from './team'

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
  team: TeamBaseWithLogo
  gameCount: number
  startDate: string
  endDate: string
}

export type MaxMinGoals = {
  date: string
  result: string | null
  value: number
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
}

export type MaxMinDiffAndGoals = {
  value: number
  games: Array<MaxMinGoals>
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
  winStreak: Array<StreakData>
  losingStreak: Array<StreakData>
  drawStreak: Array<StreakData>
  noWinStreak: Array<StreakData>
  unbeatenStreak: Array<StreakData>
  maxGoals: MaxMinDiffAndGoals
  minGoals: MaxMinDiffAndGoals
  maxDiff: MaxMinDiffAndGoals
}
