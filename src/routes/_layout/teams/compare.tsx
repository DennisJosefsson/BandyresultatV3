import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teams/compare')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/teams/compare"!</div>
}
