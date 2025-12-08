import { createMiddleware } from '@tanstack/react-start'
import CompareRequestError from './CompareRequestError'

export const errorMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    try {
      const result = await next()
      return result
    } catch (error) {
      if (error && error instanceof CompareRequestError) {
        console.error('Compare request error!', error.message)
        throw error
        // throw json(
        //   {
        //     message: error.message,
        //   },
        //   { status: 400, statusText: 'Compare request error' },
        // )
      }
    }

    const result = await next()
    return result
  },
)
