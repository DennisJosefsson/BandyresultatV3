import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/records/conceded')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/maraton/records/conceded"!</div>
}
