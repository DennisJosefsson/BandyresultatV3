import { db } from '@/db'
import { MapTeam } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { asc, sql } from 'drizzle-orm'
import { z } from 'zod'

const women = z.boolean()

type SortedTeamGroups = {
  [key: string]: MapTeam[]
}

export const getMapTeams = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(women))
  .handler(async ({ data: women }) => {
    const mapTeams = await db.query.teams.findMany({
      where: (teams, { eq, ne, and }) =>
        and(eq(teams.women, women), ne(teams.teamId, 176)),
      with: {
        county: true,
        municipality: true,
      },
      orderBy: [asc(sql`casual_name collate "se-SE-x-icu"`)],
    })

    const sortedTeams = sortMapTeams(mapTeams)

    return sortedTeams
  })

function sortMapTeams(teamArray: MapTeam[]) {
  const sortCounties = teamArray.reduce((groups, team) => {
    if (!groups[team.county.name]) {
      groups[team.county.name] = []
    }
    groups[team.county.name].push(team)
    return groups
  }, {} as SortedTeamGroups)

  return Object.keys(sortCounties).map((county) => {
    return {
      county,
      teams: sortCounties[county],
    }
  })
}
