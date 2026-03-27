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

export type MaratonTable = Omit<
  TeamTable,
  'season' | 'women' | 'group'
> & {
  seasons: number
}

export type DevDataTableItem = Omit<
  TeamTable,
  'season' | 'women' | 'group'
> & {
  position: number
  date: string
}
export type ReturnDevDataTableItem = DevDataTableItem & {
  arrowDirection: 'up' | 'down' | null
}

export type PlayoffTable = Omit<
  TeamTable,
  'women' | 'season'
> & {
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

export type SingleTeamTableItem = {
  category: string
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
  serie: {
    level: number
  }
}

export const singleTeamTableItem = zd.object({
  category: zd.string(),
  totalDraws: zd.coerce.number(),
  totalGames: zd.coerce.number(),
  totalGoalDifference: zd.coerce.number(),
  totalGoalsConceded: zd.coerce.number(),
  totalGoalsScored: zd.coerce.number(),
  totalLost: zd.coerce.number(),
  totalPoints: zd.coerce.number(),
  totalWins: zd.coerce.number(),
  serie: zd.object({ level: zd.number() }),
})

export const singleTeamTable = zd.array(singleTeamTableItem)

export type SingleTeamTables = Array<{
  level: string
  levelName: string
  tables: Array<{
    category: string
    categoryName: string
    tables: SingleTeamTableItem
  }>
}>

export const newStaticTable = zd.object({
  teamName: zd.string(),
  teamId: zd.number(),
  seasonId: zd.number(),
  games: zd.number().nonnegative(),
  position: zd.number().positive().int(),
  won: zd.number().nonnegative(),
  draw: zd.number().nonnegative().int(),
  lost: zd.number().nonnegative().int(),
  scoredGoals: zd.number().nonnegative().int(),
  concededGoals: zd.number().nonnegative().int(),
  goalDifference: zd.number().nonnegative().int(),
  points: zd.number().nonnegative().int(),
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
  games: zd.number().nonnegative(),
  position: zd.number().positive().int(),
  won: zd.number().nonnegative(),
  draw: zd.number().nonnegative().int(),
  lost: zd.number().nonnegative().int(),
  scoredGoals: zd.number().nonnegative().int(),
  concededGoals: zd.number().nonnegative().int(),
  goalDifference: zd.number().nonnegative().int(),
  points: zd.number().nonnegative().int(),
})

export const editStaticTableArray = zd.object({
  tableArray: zd.array(editStaticTable),
})
