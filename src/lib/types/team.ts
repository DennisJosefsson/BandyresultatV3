import type {
  county,
  municipality,
  teamlogos,
  teamnames,
} from '@/db/schema'
import { zd } from '../utils/zod'

export type TeamName = typeof teamnames.$inferSelect

export type TeamBase = TeamName & { teamId: number }

export type TeamBaseWithLogo = TeamBase & {
  logo: typeof teamlogos.$inferSelect
}

export type MapTeam = TeamName & {
  county: typeof county.$inferSelect
} & {
  municipality: typeof municipality.$inferSelect | null
}

export type TeamBaseWithTeamGameId = TeamName & {
  teamGameId: number
}

export type SingleTeam = TeamName & {
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
}

export const newTeam = zd.object({
  name: zd.string(),
  city: zd.string(),
  casualName: zd.string(),
  shortName: zd.string(),
  women: zd.boolean().optional(),
  lat: zd.number(),
  long: zd.number(),
  countyId: zd.number(),
  municipalityId: zd.number().transform((val) => {
    if (val === 0) return null
    return val
  }),
})

export const editTeamObject = zd.object({
  teamId: zd.number(),
  name: zd.string(),
  city: zd.string(),
  casualName: zd.string(),
  shortName: zd.string(),
  women: zd.boolean().optional(),
  lat: zd.number(),
  long: zd.number(),
  countyId: zd.number(),
  municipalityId: zd.number().transform((val) => {
    if (val === 0) return null
    return val
  }),
})

export type TeamStreak = {
  teamId: number
  name: string
  women: boolean
  gameCount: number
  startDate: string
  endDate: string
}

export type TeamPlayoffStreak = {
  streakLength: number
  startYear: string
  endYear: string
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
