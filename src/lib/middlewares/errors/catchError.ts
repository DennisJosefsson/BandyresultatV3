import { ZodError } from 'zod'
import DatabaseConnectionError from './ConnectionError'
import DbError from './DbError'
import ZodParsingError from './ZodParsingError'
import { getDbErrorMessage } from './getDbErrorMessage'

export function catchError(error: unknown) {
  if (error instanceof ZodError) {
    const errorString = error.issues
      .map((e) => e.message)
      .join(', ')
    throw new ZodParsingError({ message: errorString })
  } else if (error instanceof TypeError) {
    console.error(error)
    throw error
  }
  const { message, constraint, query } =
    getDbErrorMessage(error)
  if (message.includes('Databaskoppling saknas')) {
    throw new DatabaseConnectionError({ message })
  }
  if (message !== 'Other error') {
    const errorString = constraint
      ? message + ', ' + constraint
      : message

    throw new DbError({
      message: errorString,
      context: {
        query: query ?? 'Query not defined',
        constraint: constraint ?? 'Constraint not defined',
      },
    })
  } else if (error instanceof Error) {
    console.error(error)
    throw new Error(error.message)
  } else {
    console.error(error)
    throw new Error('Något gick fel.')
  }
}
