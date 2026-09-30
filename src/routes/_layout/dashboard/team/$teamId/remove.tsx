import { createFileRoute } from '@tanstack/react-router'
import RemoveTeamSeasonTeamNameForm from '../../-components/Forms/TeamForms/RemoveTeamSeasonTeamNameForm'
import { getTeamSeasonsForTeamNameEdit } from '../../-functions/TeamFunctions/getTeamSeasonsForTeamNameEdit'

export const Route = createFileRoute(
  '/_layout/dashboard/team/$teamId/remove',
)({
  loader: async ({ params: { teamId } }) => {
    const teamSeasonArray =
      await getTeamSeasonsForTeamNameEdit({
        data: { teamId },
      })
    if (!teamSeasonArray) {
      throw new Error('Missing teamSeasonArray')
    }
    return teamSeasonArray
  },
  component: RemoveTeamSeasonTeamNameForm,
})
