import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/streaks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/maraton/records/streaks"!</div>
}
