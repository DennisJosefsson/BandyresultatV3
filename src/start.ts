import { createCsrfMiddleware, createStart } from '@tanstack/react-start'
import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { zodParsingErrorAdapter } from './lib/middlewares/errors/ZodParsingError'
import { unauthorizedErrorAdapter } from './lib/middlewares/errors/UnauthorizedError'
import { errorMiddleware } from './lib/middlewares/errors/errorMiddleware'
import { dbErrorAdapter } from './lib/middlewares/errors/DbError'
import { compareRequestErrorAdapter } from './lib/middlewares/errors/CompareRequestError'

const SECRET_KEY = process.env.CLERK_SECRET_KEY

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      csrfMiddleware,
      clerkMiddleware({
        secretKey: SECRET_KEY,
      }),
    ],
    serializationAdapters: [
      compareRequestErrorAdapter,
      zodParsingErrorAdapter,
      dbErrorAdapter,
      unauthorizedErrorAdapter,
    ],
    functionMiddleware: [errorMiddleware],
  }
})
