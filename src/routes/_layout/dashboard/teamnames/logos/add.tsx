import { createFileRoute } from '@tanstack/react-router'
import AddTeamLogo from '../../-components/Forms/TeamForms/AddTeamLogo'
import { getNewTeamLogoId } from '../../-functions/TeamFunctions/getLastTeamLogoId'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/logos/add',
)({
  loader: async () => {
    const logoId = await getNewTeamLogoId()
    return logoId
  },
  component: RouteComponent,
})

function RouteComponent() {
  const logoId = Route.useLoaderData()

  if (!logoId) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <span className="font-semibold text-sm">
          Saknar logoId
        </span>
      </div>
    )
  }
  return <AddTeamLogo newLogoId={logoId} />
}
