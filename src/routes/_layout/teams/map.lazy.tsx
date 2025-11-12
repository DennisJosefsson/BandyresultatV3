import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/teams/map"!</div>
}
