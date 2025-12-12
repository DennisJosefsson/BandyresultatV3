import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$teamId/$seasonId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/team/$teamId/$seasonId"!</div>
}
