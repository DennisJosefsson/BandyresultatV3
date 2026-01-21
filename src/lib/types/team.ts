import { county, municipality, teams } from '@/db/schema'

export type Team = typeof teams.$inferSelect

export type TeamBase = Pick<
  Team,
  'teamId' | 'casualName' | 'name' | 'shortName'
>

export type MapTeam = Team & {
  county: typeof county.$inferSelect
} & { municipality: typeof municipality.$inferSelect | null }
