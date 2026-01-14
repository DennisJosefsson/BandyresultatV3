import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$year/$group/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/season/$year/$group/map"!</div>
}
