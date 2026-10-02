import type {
  county,
  municipality,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import { zd } from '../utils/zod'

export type Team = typeof teams.$inferSelect & {
  teamname: TeamName & {
    logo: typeof teamlogos.$inferSelect | null
  }
}

export type TeamName = typeof teamnames.$inferSelect

export type TeamBase = TeamName & { teamId: number }

export type TeamNameWithLogo = TeamName & {
  logo: typeof teamlogos.$inferSelect
}

export type TeamBaseWithLogo = TeamBase & {
  logo: typeof teamlogos.$inferSelect
}

export type MapTeam = Team & {
  county: typeof county.$inferSelect
} & {
  municipality: typeof municipality.$inferSelect | null
}

export type TeamBaseWithTeamGameId = TeamName & {
  teamGameId: number
}

export type SingleTeam = Team & {
  county: typeof county.$inferSelect
} & {
  municipality: typeof municipality.$inferSelect | null
} & {
  teamseasons: Array<{
    qualification: boolean | null
    season: {
      seasonId: number
      year: string
    }
  }>
} & {
  teamname: TeamName & {
    logo: typeof teamlogos.$inferSelect | null
  }
}

export const newTeam = zd.object({
  city: zd.string(),
  women: zd.boolean().optional(),
  lat: zd.number(),
  long: zd.number(),
  countyId: zd.number(),
  teamnameId: zd.number(),
  municipalityId: zd.number().transform((val) => {
    if (val === 0) return null
    return val
  }),
})

export const editTeamObject = zd.object({
  teamId: zd.number(),
  city: zd.string(),
  women: zd.boolean().optional(),
  lat: zd.number(),
  long: zd.number(),
  countyId: zd.number(),
  teamnameId: zd.number(),
  municipalityId: zd.number().transform((val) => {
    if (val === 0) return null
    return val
  }),
})

export const addTeamNameObject = zd.object({
  name: zd.string().max(30),
  casualName: zd.string().max(30),
  shortName: zd.string().max(6),
  logoId: zd.int().optional(),
})

export const editTeamNameObject = addTeamNameObject.and(
  zd.object({ teamnameId: zd.int() }),
)

export const addTeamLogoObject = zd.object({
  logoId: zd.int(),
  hasDark: zd.boolean().nullable().default(false),
})

export const editTeamLogoObject = addTeamLogoObject.and(
  zd.object({ teamlogoId: zd.uuidv4() }),
)

export type TeamStreak = {
  gameCount: number
  startDate: string
  endDate: string
}

export type TeamPlayoffStreak = {
  streakLength: number
  startYear: string
  endYear: string
}

export type TeamStreakV2 = {
  count: number
  startDate: string
  endDate: string
}

export type TeamPlayoffStreakV2 = {
  count: number
  startYear: string
  endYear: string
}

export type TeamStatCount = {
  count: number | null
  first: string | null
  latest: string | null
}

export type TeamStatItem = {
  gameId: number
  date: string
  result: string | null
  homeTeam: string | null
  awayTeam: string | null
}

export type FiveSeasonTableItem = {
  seasonId: number
  group: string
  category: string
  totalGames: number
  totalPoints: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalWins: number
  totalDraws: number
  totalLost: number
  serie: {
    serieName: string
    level: number
    competition: {
      competitionName: string
      division: number
    }
  }
  season: {
    year: string
  }
}

export type Competition = {
  competitionName: string
  division: number
  tables: Array<FiveSeasonTableItem>
}

export type FiveSeason = {
  season: string
  competitions: Array<Competition>
}

export type TeamRecord = {
  gameId: number
  result: string
  otResult: string | null
  date: string
  serieName: string
  home: TeamBaseWithLogo
  away: TeamBaseWithLogo
}

export type HomeAndAwayTeamRecords = {
  maxScored: Array<TeamRecord> | null
  maxConceded: Array<TeamRecord> | null
  maxTotalGoals: Array<TeamRecord> | null
  minTotalGoals: Array<TeamRecord> | null
  minGoalDifference: Array<TeamRecord> | null
  maxGoalDifference: Array<TeamRecord> | null
}

export type TeamSeasonStats = {
  teamId: number
  firstDivisionSeasons: number | null
  qualificationSeasons: number | null
  firstAndLatestSeason: Omit<TeamStatCount, 'count'>
  finalCount: Omit<TeamStatCount, 'first'>
  finalWinCount: Omit<TeamStatCount, 'first'>
  playoffCount: Omit<TeamStatCount, 'first'>
  losingStreaks: Array<TeamStreakV2>
  drawStreaks: Array<TeamStreakV2>
  noWinStreaks: Array<TeamStreakV2>
  unbeatenStreaks: Array<TeamStreakV2>
  winStreaks: Array<TeamStreakV2>
  playoffStreaks: Array<TeamPlayoffStreakV2>
  finalStreaks: Array<TeamPlayoffStreakV2>
  finalWinStreaks: Array<TeamPlayoffStreakV2>
  homeRecords: HomeAndAwayTeamRecords | undefined
  awayRecords: HomeAndAwayTeamRecords | undefined
}
