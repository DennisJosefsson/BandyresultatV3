import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import EditTeamName from '../-components/Forms/TeamForms/EditTeamName'
import { getTeamName } from '../-functions/TeamFunctions/getTeamName'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/$teamnameId',
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
  loader: async ({ params: { teamnameId } }) => {
    const data = await getTeamName({ data: { teamnameId } })

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const teamName = Route.useLoaderData()
  if (!teamName) {
    return (
      <div className="flex flex-row justify-center">
        <span className="text-sm mt-4 font-semibold">
          Finns inget sådant lagnamn.
        </span>
      </div>
    )
  }
  return (
    <div>
      <EditTeamName {...teamName} />
    </div>
  )
}
