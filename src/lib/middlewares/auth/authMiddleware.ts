import {
  auth,
  clerkClient,
} from '@clerk/tanstack-react-start/server'
import { createMiddleware } from '@tanstack/react-start'
import UnauthorizedError from '../errors/UnauthorizedError'

export const authMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  const { orgRole, userId } = await auth()
  const isAdmin = orgRole === 'org:admin'
  if (!isAdmin) {
    throw new UnauthorizedError()
  }

  const user = await clerkClient().users.getUser(userId)

  const result = await next({ context: { user, isAdmin } })
  return result
})
