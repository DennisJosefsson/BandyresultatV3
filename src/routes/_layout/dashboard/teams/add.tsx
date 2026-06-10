import { createFileRoute } from '@tanstack/react-router'
import { getCountiesForTeamForm } from '../-functions/TeamFunctions/getCountriesForTeamForm'
import AddTeam from '../-components/Forms/TeamForms/AddTeam'

export const Route = createFileRoute('/_layout/dashboard/teams/add')({
  loader: async () => {
    const counties = await getCountiesForTeamForm()
    if (!counties) throw new Error('Missing data')

    return counties
  },

  component: AddTeam,
})
