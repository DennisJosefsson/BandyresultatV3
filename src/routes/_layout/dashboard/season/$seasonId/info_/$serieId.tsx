import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dashboard/season/$seasonId/info_/$serieId"!</div>
}
