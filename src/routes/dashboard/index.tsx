import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { orgRole } = await auth()
  const isAdmin = orgRole === 'org:admin'

  if (!isAdmin) {
    throw redirect({
      to: '/unauthorized',
    })
  }
})

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: () => authStateFn(),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
