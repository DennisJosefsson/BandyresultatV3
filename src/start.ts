import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from '@tanstack/react-start'
import { error404Adapter } from './lib/middlewares/errors/404Error'
import { compareRequestErrorAdapter } from './lib/middlewares/errors/CompareRequestError'
import { databaseconnectionErrorAdapter } from './lib/middlewares/errors/ConnectionError'
import { dbErrorAdapter } from './lib/middlewares/errors/DbError'
import { unauthorizedErrorAdapter } from './lib/middlewares/errors/UnauthorizedError'
import { zodParsingErrorAdapter } from './lib/middlewares/errors/ZodParsingError'
import { errorMiddleware } from './lib/middlewares/errors/errorMiddleware'

const SECRET_KEY = process.env.CLERK_SECRET_KEY

const headerMiddleware = createMiddleware({
  type: 'function',
}).client(({ next }) => {
  return next({
    headers: {
      'Cross-Origin-Opener-Policy':
        'same-origin-allow-popups',
    },
  })
})

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
      databaseconnectionErrorAdapter,
      unauthorizedErrorAdapter,
      error404Adapter,
    ],
    functionMiddleware: [headerMiddleware, errorMiddleware],
  }
})
