import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/teamnames/logos/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/dashboard/teamnames/logos/add"!</div>
}
