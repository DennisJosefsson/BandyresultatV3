import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import DatabaseConnectionError from './ConnectionError'
import DbError from './DbError'
import UnauthorizedError from './UnauthorizedError'
import ZodParsingError from './ZodParsingError'
import { logError } from './logError'

const logErrorToDatabase = async (error: Error) => {
  const cause =
    error.cause instanceof Error
      ? error.cause.message
      : 'Ingen cause'
  const errorData = {
    name: error.name,
    message: `${error.message} och ${cause}`,
    body: error.stack ?? 'Ingen stack',
    date: new Date().toISOString(),
    backend: false,
  }
  await logError({ data: errorData })
}

export const errorMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  try {
    const result = await next()

    return result
  } catch (error) {
    if (error) {
      if (error instanceof ZodParsingError) {
        logErrorToDatabase(error)
        console.error('Zod parsing error', error.message)
        throw error
      } else if (error instanceof UnauthorizedError) {
        logErrorToDatabase(error)
        throw redirect({
          to: '/unauthorized',
          search: { women: false },
          state: {
            redirectCause: error.message,
          },
        })
      } else if (error instanceof DbError) {
        logErrorToDatabase(error)
        console.error(
          'Database error:',
          error.name,
          error.message,
          error.context.constraint,
          error.context.query,
        )

        throw error
      } else if (error instanceof DatabaseConnectionError) {
        //
        console.error('Connection error', error)
        throw error
      } else if (error instanceof Error) {
        logErrorToDatabase(error)
        console.error('Unknown error', error.message)
        throw error
      }
    }
  }

  const result = await next()

  return result
})
