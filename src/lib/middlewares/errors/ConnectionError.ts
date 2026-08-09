import { createSerializationAdapter } from '@tanstack/react-router'
import { CustomError } from './CustomError'

export default class DatabaseConnectionError extends CustomError {
  private static readonly _statusCode = 500
  private readonly _code: number
  private readonly _logging: boolean
  private readonly _context: { [key: string]: string }

  constructor(params?: {
    code?: number
    message?: string
    logging?: boolean
    context?: { [key: string]: string }
  }) {
    const { code, message, logging } = params || {}

    super(message || 'Database error')
    this._code = code || DatabaseConnectionError._statusCode
    this._logging = logging || false
    this._context = params?.context || {}

    Object.setPrototypeOf(
      this,
      DatabaseConnectionError.prototype,
    )
  }

  get errors() {
    return [
      { message: this.message, context: this._context },
    ]
  }

  get statusCode() {
    return this._code
  }

  get logging() {
    return this._logging
  }

  get context() {
    return this._context
  }
}

export const databaseconnectionErrorAdapter =
  createSerializationAdapter({
    key: 'db-error',
    test: (v) => v instanceof DatabaseConnectionError,
    toSerializable: ({
      message,
      errors,
      statusCode,
      logging,
    }) => {
      return {
        message,
        errors,
        logging,
        statusCode,
      }
    },
    fromSerializable: ({
      message,
      statusCode,
      logging,
    }) => {
      return new DatabaseConnectionError({
        message,
        code: statusCode,
        logging,
      })
    },
  })
