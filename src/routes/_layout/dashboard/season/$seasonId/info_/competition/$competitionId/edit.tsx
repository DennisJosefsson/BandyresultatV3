import EditCompetition from '@/routes/_layout/dashboard/-components/Forms/CompetitionForms/EditCompetition'
import { getCompetitionForEdit } from '@/routes/_layout/dashboard/-functions/CompetitionFunctions/getCompetitionForEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/edit',
)({
  loader: async ({ params }) => {
    const data = await getCompetitionForEdit({
      data: { competitionId: params.competitionId },
    })
    if (!data) throw new Error('Missing competition data')

    return data
  },
  component: EditCompetition,
})
