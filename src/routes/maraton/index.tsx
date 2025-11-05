import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/maraton/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/maraton/"!</div>
}
