import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/maraton/table')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/maraton/"!</div>
}
