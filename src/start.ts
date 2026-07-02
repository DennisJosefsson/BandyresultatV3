import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import {
  createCsrfMiddleware,
  createStart,
} from '@tanstack/react-start'
import { compareRequestErrorAdapter } from './lib/middlewares/errors/CompareRequestError'
import { dbErrorAdapter } from './lib/middlewares/errors/DbError'
import { unauthorizedErrorAdapter } from './lib/middlewares/errors/UnauthorizedError'
import { zodParsingErrorAdapter } from './lib/middlewares/errors/ZodParsingError'
import { errorMiddleware } from './lib/middlewares/errors/errorMiddleware'
import { serverEnv } from './lib/env/serverEnv'

const SECRET_KEY = serverEnv.CLERK_SECRET_KEY

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
