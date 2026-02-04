import { county, municipality, teams } from '@/db/schema'
import { zd } from '../utils/zod'

export type Team = typeof teams.$inferSelect

export type TeamBase = Pick<
  Team,
  'teamId' | 'casualName' | 'name' | 'shortName'
>

export type MapTeam = Team & {
  county: typeof county.$inferSelect
} & { municipality: typeof municipality.$inferSelect | null }

export type TeamBaseWithTeamGameId = TeamBase & { teamGameId: number }

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
