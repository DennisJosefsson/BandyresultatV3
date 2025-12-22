import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/season/$year/{-$group}/tables')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/season/$year/-group/tables"!</div>
}
