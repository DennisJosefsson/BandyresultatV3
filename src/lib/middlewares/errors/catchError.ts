import { ZodError } from 'zod'
import DbError from './DbError'
import { getDbErrorMessage } from './getDbErrorMessage'
import ZodParsingError from './ZodParsingError'

export function catchError(error: unknown) {
  if (error instanceof ZodError) {
    const errorString = error.issues.map((e) => e.message).join(', ')
    throw new ZodParsingError({ message: errorString })
  }
  const { message, constraint, query } = getDbErrorMessage(error)
  if (message !== 'Other error') {
    const errorString = constraint ? message + ', ' + constraint : message

    throw new DbError({
      message: errorString,
      context: {
        query: query ?? 'Query not defined',
        constraint: constraint ?? 'Constraint not defined',
      },
    })
  } else {
    throw new Error('An error occured')
  }
}
