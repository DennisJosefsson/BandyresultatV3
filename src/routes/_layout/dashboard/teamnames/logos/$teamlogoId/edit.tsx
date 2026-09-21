import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import EditTeamLogo from '../../../-components/Forms/TeamForms/EditTeamLogo'
import { getTeamLogoByUUIDV4 } from '../../../-functions/TeamFunctions/getTeamLogoByUUIDV4'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/logos/$teamlogoId/edit',
)({
  params: {
    parse: (params) => ({
      teamlogoId: zd.uuidv4().parse(params.teamlogoId),
    }),
    stringify: ({ teamlogoId }) => ({
      teamlogoId: `${teamlogoId}`,
    }),
  },
  loader: async ({ params: { teamlogoId } }) => {
    const data = await getTeamLogoByUUIDV4({
      data: { teamlogoId },
    })
    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const teamLogo = Route.useLoaderData()
  if (!teamLogo) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <span className="font-semibold text-sm">
          Finns ingen sådan TeamLogo.
        </span>
      </div>
    )
  }
  return <EditTeamLogo teamLogo={teamLogo} />
}
