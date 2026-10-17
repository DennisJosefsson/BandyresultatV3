import type {
  mvConcededRecords,
  mvGeneralStats,
  mvPointsRecords,
  mvScoredRecords,
  mvTeamStreakRecords,
} from '@/db/views/maratonAndRecordViews'
import type { TeamBaseWithLogo } from './team'

export type RecordStreak = {
  position: number | undefined
  team: TeamBaseWithLogo
  gameCount: number
  startDate: string
  endDate: string
}

export type GameRecordStreakV2 = {
  position: number
  team: TeamBaseWithLogo
  count: number
  startDate: string
  endDate: string
}

export type SeasonRecordStreakV2 = {
  position: number
  team: TeamBaseWithLogo
  count: number
  startYear: string
  endYear: string
}

export type CurrInoffChamp = {
  date: string
  result: string
  team: TeamBaseWithLogo
  opponent: TeamBaseWithLogo
}

export type CurrInoffChampV2 = {
  gameId: number
  date: string
  result: string
  serieName: string
  team: TeamBaseWithLogo
  opp: TeamBaseWithLogo
}

export type CurrInoffChampObject = {
  count: number
  gameArray: Array<CurrInoffChampV2>
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

export type RecordDataV2 = {
  position: number
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

export type MaxMinGoalGamesV2 = {
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
  position: number
  gameId: number
  date: string
  result: string
  otResult: string | null
  played: boolean
  serieName: string
  homeGoal: number
  awayGoal: number
  penalties: boolean | null
  extraTime: boolean | null
  homeTeamId: number
  awayTeamId: number
  halftimeResult: string | null
}

export type GoalRecordGames = {
  gameArray: Array<MaxMinGoalGamesV2>
  arrayEndGoals: number
  gameCount: number
}

export type GeneralStatItem = {
  position: number | undefined
  count: number
  team: TeamBaseWithLogo
}

export type GeneralStatItemV2 = {
  position: number
  data: number
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

export type MvGeneralStats =
  typeof mvGeneralStats.$inferSelect

export type MvTeamStreakRecords =
  typeof mvTeamStreakRecords.$inferSelect

export type MvPointsRecords =
  typeof mvPointsRecords.$inferSelect

export type MvConcededRecords =
  typeof mvConcededRecords.$inferSelect

export type MvScoredRecords =
  typeof mvScoredRecords.$inferSelect
