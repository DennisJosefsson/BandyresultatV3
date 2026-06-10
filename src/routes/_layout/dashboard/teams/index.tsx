import { createFileRoute } from '@tanstack/react-router'
import { getAllTeams } from '../-functions/TeamFunctions/getAllTeams'
import TeamsList from '../-components/Team/TeamsList'

export const Route = createFileRoute('/_layout/dashboard/teams/')({
  loader: async () => {
    const teams = await getAllTeams()
    if (!teams) throw new Error('Missing data')

    return teams
  },

  component: TeamsList,
})
