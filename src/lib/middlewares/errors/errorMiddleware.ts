import { createMiddleware } from '@tanstack/react-start'
import DbError from './DbError'
import ZodParsingError from './ZodParsingError'

export const errorMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    try {
      const result = await next()
      return result
    } catch (error) {
      if (error) {
        if (error instanceof ZodParsingError) {
          console.error('Zod parsing error', error.message)
          throw error
        } else if (error instanceof DbError) {
          console.error(
            'Database error:',
            error.name,
            error.message,
            error.context.constraint,
            error.context.query,
          )

          throw error
        } else if (error instanceof Error) {
          console.error('Unknown error', error.message)
          throw error
        }
      }
    }

    const result = await next()
    return result
  },
)
