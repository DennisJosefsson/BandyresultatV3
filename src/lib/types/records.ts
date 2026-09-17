import type { TeamBaseWithLogo } from './team'

export type RecordStreak = {
  position: number | undefined
  team: TeamBaseWithLogo
  gameCount: number
  startDate: string
  endDate: string
}

export type CurrInoffChamp = {
  date: string
  result: string
  team: TeamBaseWithLogo
  opponent: TeamBaseWithLogo
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
  team: TeamBaseWithLogo
}

export type MaxMinGoalGames = {
  position: number | undefined
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
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
  team: TeamBaseWithLogo
}

export type GeneralStats = {
  golds: Array<GeneralStatItem>
  finals: Array<GeneralStatItem>
  playoffs: Array<GeneralStatItem>
  allPlayoffs: Array<GeneralStatItem>
  seasons: Array<GeneralStatItem>
  allSeasons: Array<GeneralStatItem>
}
