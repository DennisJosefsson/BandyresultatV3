import { db } from '@/db'
import {
  county,
  municipality,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  eq,
  getTableColumns,
  ne,
  sql,
} from 'drizzle-orm'

export const preparedMapTeamsList = db
  .select({
    ...getTableColumns(teams),
    county: {
      ...getTableColumns(county),
    } as unknown as SQL<{ countyId: number; name: string }>,
    municipality: { ...getTableColumns(municipality) },
    teamname: {
      teamid: teams.teamId,
      name: teamnames.name,
      casualName: teamnames.casualName,
      shortName: teamnames.shortName,
      logo: {
        logoId: teamlogos.logoId,
        hasDark: teamlogos.hasDark,
      },
    } as unknown as SQL<TeamBaseWithLogo>,
  })
  .from(teams)
  .leftJoin(
    teamnames,
    eq(teams.teamnameId, teamnames.teamnameId),
  )
  .leftJoin(
    teamlogos,
    eq(teamlogos.logoId, teamnames.logoId),
  )
  .leftJoin(county, eq(teams.countyId, county.countyId))
  .leftJoin(
    municipality,
    eq(teams.municipalityId, municipality.municipalityId),
  )
  .where(
    and(
      eq(teams.women, sql.placeholder('women')),
      ne(teams.teamId, 176),
    ),
  )
  .orderBy(
    asc(sql`teamnames.casual_name collate "se-SE-x-icu"`),
  )
  .prepare('mapTeamListQuery')
