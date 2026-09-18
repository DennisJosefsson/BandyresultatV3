import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import { getCountiesForTeamForm } from '../../../-functions/TeamFunctions/getCountriesForTeamForm'
import AddTeam from '../../../-components/Forms/TeamForms/AddTeam'

export const Route = createFileRoute(
  '/_layout/dashboard/teams/add/$teamnameId/',
)({
  params: {
    parse: (params) => ({
      teamnameId: zd
        .number()
        .int()
        .parse(Number(params.teamnameId)),
    }),
    stringify: ({ teamnameId }) => ({
      teamnameId: `${teamnameId}`,
    }),
  },
  loader: async () => {
    const counties = await getCountiesForTeamForm()
    if (!counties) throw new Error('Missing data')

    return counties
  },
  component: AddTeam,
})


