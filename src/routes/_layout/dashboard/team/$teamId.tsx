import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import EditTeam from '../-components/Forms/TeamForms/EditTeam'
import { getCountiesForTeamForm } from '../-functions/TeamFunctions/getCountriesForTeamForm'
import { getEditTeam } from '../-functions/TeamFunctions/getEditTeam'

export const Route = createFileRoute('/_layout/dashboard/team/$teamId')({
  params: {
    parse: (params) => ({
      teamId: zd.number().int().parse(Number(params.teamId)),
    }),
    stringify: ({ teamId }) => ({ teamId: `${teamId}` }),
  },
  loader: async ({ params: { teamId } }) => {
    const team = await getEditTeam({ data: { teamId } })
    const counties = await getCountiesForTeamForm()
    if (!team || !counties) throw new Error('Något gick fel')
    return { team, counties }
  },
  component: EditTeam,
})
