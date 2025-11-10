import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/teams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teams/"!</div>
}
