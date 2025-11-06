import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { createStart } from '@tanstack/react-start'

const SECRET_KEY = process.env.CLERK_SECRET_KEY

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      clerkMiddleware({
        secretKey: SECRET_KEY,
      }),
    ],
  }
})
