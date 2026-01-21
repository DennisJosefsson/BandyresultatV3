import { TeamBase } from './team'

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
    games: CurrInoffChamp[]
  }
  winStreak: RecordStreak[]
  losingStreak: RecordStreak[]
  drawStreak: RecordStreak[]
  noWinStreak: RecordStreak[]
  unbeatenStreak: RecordStreak[]
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
  averageMax: RecordData[]
  averageMaxHome: RecordData[]
  averageMaxAway: RecordData[]
  averageMin: RecordData[]
  averageMinHome: RecordData[]
  averageMinAway: RecordData[]
  sumMax: RecordData[]
  sumMaxHome: RecordData[]
  sumMaxAway: RecordData[]
  sumMin: RecordData[]
  sumMinHome: RecordData[]
  sumMinAway: RecordData[]
}

export type GoalCountObject = {
  maxGoalCount: number
  lastMaxGoal: number
  minGoalCount: number
  lastMinGoal: number
}

export type GoalRecordDataArrays = RecordDataArrays & {
  gamesMaxGoals: MaxMinGoalGames[]
  gamesMinGoals: MaxMinGoalGames[]
  count: GoalCountObject
}

export type GeneralStatItem = {
  position: number | undefined
  count: number
  team: TeamBase
}

export type GeneratStats = {
  golds: GeneralStatItem[]
  finals: GeneralStatItem[]
  playoffs: GeneralStatItem[]
  allPlayoffs: GeneralStatItem[]
  seasons: GeneralStatItem[]
  allSeasons: GeneralStatItem[]
}
