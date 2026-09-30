import { catchError } from '@/lib/middlewares/errors/catchError'
import type { MapTeam } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { preparedMapTeamsList } from './preparedQueries/preparedMapTeamsList'

const women = z.boolean()

type SortedTeamGroups = {
  [key: string]: Array<MapTeam>
}

export const getMapTeams = createServerFn({ method: 'GET' })
  .validator(women)
  .handler(async ({ data }) => {
    try {
      const mapTeams = await preparedMapTeamsList.execute({
        women: data,
      })

      const sortedTeams = sortMapTeams(mapTeams)

      return sortedTeams
    } catch (error) {
      catchError(error)
    }
  })

function sortMapTeams(teamArray: Array<MapTeam>) {
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
