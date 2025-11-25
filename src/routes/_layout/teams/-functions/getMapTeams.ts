import { db } from '@/db'
import { county, teams } from '@/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { asc, sql } from 'drizzle-orm'
import { z } from 'zod'

const women = z.boolean()

type MapTeams = typeof teams.$inferSelect & {
  county: typeof county.$inferSelect
}

type SortedTeamGroups = {
  [key: string]: (typeof teams.$inferSelect)[]
}

export const getMapTeams = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(women))
  .handler(async ({ data: women }) => {
    const mapTeams = await db.query.teams.findMany({
      where: (teams, { eq, ne, and }) =>
        and(eq(teams.women, women), ne(teams.teamId, 176)),
      with: {
        county: true,
      },
      orderBy: [asc(sql`casual_name collate "se-SE-x-icu"`)],
    })

    const sortedTeams = sortMapTeams(mapTeams)

    return sortedTeams
  })

function sortMapTeams(teamArray: MapTeams[]) {
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
