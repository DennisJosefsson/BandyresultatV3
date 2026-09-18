import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/logos/$teamlogoId/edit',
)({
  params: {
    parse: (params) => ({
      teamlogoId: zd.uuid().parse(params.teamlogoId),
    }),
    stringify: ({ teamlogoId }) => ({
      teamlogoId: `${teamlogoId}`,
    }),
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_layout/dashboard/teamnames/logos/$logoId/edit"!
    </div>
  )
}
