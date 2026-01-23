import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_layout/search')

export const useSearchTeams = () => {
  const teams = route.useLoaderData()
  const women = route.useSearch({ select: (s) => s.women })

  const filteredTeams = teams
    .filter((team) => team.women === women)
    .map((team) => {
      return { value: team.teamId, label: team.name }
    })

  return { teamSelection: filteredTeams }
}
