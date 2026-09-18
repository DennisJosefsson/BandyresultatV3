import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/teamnames/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dashboard/teamnames/add"!</div>
}
