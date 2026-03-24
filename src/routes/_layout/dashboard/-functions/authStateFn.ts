import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const authStateFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const { orgRole } = await auth()
  const isAdmin = orgRole === 'org:admin'

  return { isAdmin }
})
