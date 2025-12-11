import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { createStart } from '@tanstack/react-start'
import { compareRequestErrorAdapter } from './lib/middlewares/errors/CompareRequestError'
import { dbErrorAdapter } from './lib/middlewares/errors/DbError'
import { errorMiddleware } from './lib/middlewares/errors/errorMiddleware'
import { zodParsingErrorAdapter } from './lib/middlewares/errors/ZodParsingError'

const SECRET_KEY = process.env.CLERK_SECRET_KEY

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      clerkMiddleware({
        secretKey: SECRET_KEY,
      }),
    ],
    serializationAdapters: [
      compareRequestErrorAdapter,
      zodParsingErrorAdapter,
      dbErrorAdapter,
    ],
    functionMiddleware: [errorMiddleware],
  }
})
