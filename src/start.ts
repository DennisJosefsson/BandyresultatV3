import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import {
  createCsrfMiddleware,
  createStart,
} from '@tanstack/react-start'
import { sharedEnv } from './lib/env/sharedEnv'
import { compareRequestErrorAdapter } from './lib/middlewares/errors/CompareRequestError'
import { dbErrorAdapter } from './lib/middlewares/errors/DbError'
import { unauthorizedErrorAdapter } from './lib/middlewares/errors/UnauthorizedError'
import { zodParsingErrorAdapter } from './lib/middlewares/errors/ZodParsingError'
import { errorMiddleware } from './lib/middlewares/errors/errorMiddleware'

const CLERK_PROXY_URL = sharedEnv.CLERK_PROXY_URL
const SECRET_KEY = sharedEnv.CLERK_SECRET_KEY

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      csrfMiddleware,
      clerkMiddleware({
        secretKey: SECRET_KEY,
        proxyUrl: CLERK_PROXY_URL,
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
