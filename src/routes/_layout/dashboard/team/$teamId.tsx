import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/team/$teamId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dashboard/team/$teamId"!</div>
}
