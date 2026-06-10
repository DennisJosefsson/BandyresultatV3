import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'

export const authStateFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    const { orgRole } = await auth()
    const isAdmin = orgRole === 'org:admin'

    return { isAdmin }
  } catch (error) {
    console.error('authStateFnError: ', error)
    return { isAdmin: false }
  }
})
