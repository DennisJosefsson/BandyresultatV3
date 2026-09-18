import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'

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
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_layout/dashboard/teamnames/$teamnameId"!
    </div>
  )
}
