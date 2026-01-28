import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'

import { createServerFn } from '@tanstack/react-start'

export const authStateFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { orgRole } = await auth()
    const isAdmin = orgRole === 'org:admin'

    if (!isAdmin) {
      throw redirect({
        to: '/unauthorized',
        search: { women: false },
      })
    }
  },
)
