import { auth, clerkClient } from '@clerk/tanstack-react-start/server'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const { orgRole, userId } = await auth()
    const isAdmin = orgRole === 'org:admin'

    if (!isAdmin) {
      throw new Response('Unauthorized', { status: 401 })
    }

    const user = await clerkClient().users.getUser(userId)

    const result = await next({ context: { user } })
    return result
  },
)
