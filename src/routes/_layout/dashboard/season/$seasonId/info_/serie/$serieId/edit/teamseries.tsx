import AddTeamToSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/AddTeamToSerie'
import EditTeamSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/EditTeamserie'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/teamseries',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <AddTeamToSerie />
      <EditTeamSerie />
    </div>
  )
}
