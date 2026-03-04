import type { TeamBase } from './team'

export type RecordStreak = {
  position: number | undefined
  teamId: number
  name: string
  gameCount: number
  startDate: string
  endDate: string
}

export type CurrInoffChamp = {
  date: string
  result: string
  team: TeamBase
  opponent: TeamBase
}

export type RecordStreakData = {
  currInoffChamps: {
    count: number
    games: Array<CurrInoffChamp>
  }
  winStreak: Array<RecordStreak>
  losingStreak: Array<RecordStreak>
  drawStreak: Array<RecordStreak>
  noWinStreak: Array<RecordStreak>
  unbeatenStreak: Array<RecordStreak>
}

export type RecordData = {
  position: number | undefined
  data: number
  year: string
  team: TeamBase
}

export type MaxMinGoalGames = {
  position: number | undefined
  teams: string
  result: string
  goals: number | null
  date: string
}

export type RecordDataArrays = {
  averageMax: Array<RecordData>
  averageMaxHome: Array<RecordData>
  averageMaxAway: Array<RecordData>
  averageMin: Array<RecordData>
  averageMinHome: Array<RecordData>
  averageMinAway: Array<RecordData>
  sumMax: Array<RecordData>
  sumMaxHome: Array<RecordData>
  sumMaxAway: Array<RecordData>
  sumMin: Array<RecordData>
  sumMinHome: Array<RecordData>
  sumMinAway: Array<RecordData>
}

export type GoalCountObject = {
  maxGoalCount: number
  lastMaxGoal: number
  minGoalCount: number
  lastMinGoal: number
}

export type GoalRecordDataArrays = RecordDataArrays & {
  gamesMaxGoals: Array<MaxMinGoalGames>
  gamesMinGoals: Array<MaxMinGoalGames>
  count: GoalCountObject
}

export type GeneralStatItem = {
  position: number | undefined
  count: number
  team: TeamBase
}

export type GeneratStats = {
  golds: Array<GeneralStatItem>
  finals: Array<GeneralStatItem>
  playoffs: Array<GeneralStatItem>
  allPlayoffs: Array<GeneralStatItem>
  seasons: Array<GeneralStatItem>
  allSeasons: Array<GeneralStatItem>
}
