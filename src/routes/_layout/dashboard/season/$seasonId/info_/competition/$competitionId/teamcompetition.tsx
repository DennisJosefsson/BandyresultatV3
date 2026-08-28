import AddTeams from '@/routes/_layout/dashboard/-components/Forms/CompetitionForms/AddTeams'
import RemoveTeams from '@/routes/_layout/dashboard/-components/Forms/CompetitionForms/RemoveTeams'
import { getTeamsForCompetitions } from '@/routes/_layout/dashboard/-functions/CompetitionFunctions/getTeamsForCompetitions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/teamcompetition',
)({
  loader: async ({ params: { competitionId } }) => {
    const data = await getTeamsForCompetitions({
      data: { competitionId },
    })

    if (!data) throw new Error('Data missing from loader')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 gap-10 mt-4">
      <AddTeams />
      <RemoveTeams />
    </div>
  )
}
