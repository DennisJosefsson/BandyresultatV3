import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$year/{-$group}/stats')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/season/$year/-$group/stats"!</div>
}
