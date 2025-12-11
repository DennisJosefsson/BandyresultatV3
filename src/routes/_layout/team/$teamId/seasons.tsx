import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId/seasons')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/team/$teamId/seasons"!</div>
}
