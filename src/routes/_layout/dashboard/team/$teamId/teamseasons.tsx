import { createFileRoute } from '@tanstack/react-router'
import TeamSeasonTeamNameForm from '../../-components/Forms/TeamForms/TeamSeasonTeamNameForm'
import { getTeamSeasonsForTeamNameEdit } from '../../-functions/TeamFunctions/getTeamSeasonsForTeamNameEdit'

export const Route = createFileRoute(
  '/_layout/dashboard/team/$teamId/teamseasons',
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
  component: TeamSeasonTeamNameForm,
})
