import { createFileRoute } from '@tanstack/react-router'
import AddTeam from '../-components/Forms/TeamForms/AddTeam'
import { getCountiesForTeamForm } from '../-functions/TeamFunctions/getCountriesForTeamForm'

export const Route = createFileRoute('/_layout/dashboard/teams/add')({
  loader: async () => {
    const counties = await getCountiesForTeamForm()
    if (!counties) throw new Error('Missing data')

    return counties
  },

  component: AddTeam,
})
