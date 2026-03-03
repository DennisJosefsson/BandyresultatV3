import { zd } from '../utils/zod'

export type Base = {
  group: string
  teamId: number
  women: boolean
  season: {
    year: string
    seasonId: number
  }
  team: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
}

export type TeamTable = Base & {
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

export type GroupTable = {
  group: string
  name: string
  comment: string
  serieStructure: Array<number>
  level: number
  tables: Array<TeamTable>
}

export type MaratonTable = Omit<TeamTable, 'season' | 'women' | 'group'> & {
  seasons: number
}

export type DevDataTableItem = Omit<TeamTable, 'season' | 'women' | 'group'> & {
  position: number
  date: string
}
export type ReturnDevDataTableItem = DevDataTableItem & {
  arrowDirection: 'up' | 'down' | null
}

export type PlayoffTable = Omit<TeamTable, 'women' | 'season'> & {
  awayGoals: number
}

export type GroupPlayoffTable = {
  group: string
  result: string
  homeTeam: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
  awayTeam: {
    teamId: number
    name: string
    shortName: string
    casualName: string
  }
  tables: Array<PlayoffTable>
}

export type PlayoffSeriesTable = {
  group: string
  tables: Array<PlayoffTable>
  comment: string | null
  serieStructure: Array<number> | null
  name: string
}

export const newStaticTable = zd.object({
  teamName: zd.string(),
  teamId: zd.number(),
  seasonId: zd.number(),
  games: zd.number(),
  position: zd.number(),
  won: zd.number(),
  draw: zd.number(),
  lost: zd.number(),
  scoredGoals: zd.number(),
  concededGoals: zd.number(),
  goalDifference: zd.number(),
  points: zd.number(),
  qualification: zd.boolean(),
  women: zd.boolean(),
  group: zd.string(),
  category: zd.string(),
  serieId: zd.number(),
})

export const newStaticTableArray = zd.object({
  tableArray: zd.array(newStaticTable),
})

export const editStaticTable = zd.object({
  tableId: zd.number(),
  teamId: zd.number(),
  teamName: zd.string(),
  games: zd.number(),
  position: zd.number(),
  won: zd.number(),
  draw: zd.number(),
  lost: zd.number(),
  scoredGoals: zd.number(),
  concededGoals: zd.number(),
  goalDifference: zd.number(),
  points: zd.number(),
})

export const editStaticTableArray = zd.object({
  tableArray: zd.array(editStaticTable),
})
