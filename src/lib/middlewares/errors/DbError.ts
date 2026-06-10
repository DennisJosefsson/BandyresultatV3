import { createSerializationAdapter } from '@tanstack/react-router'
import { CustomError } from './CustomError'

export default class DbError extends CustomError {
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
    this._code = code || DbError._statusCode
    this._logging = logging || false
    this._context = params?.context || {}

    Object.setPrototypeOf(this, DbError.prototype)
  }

  get errors() {
    return [{ message: this.message, context: this._context }]
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

export const dbErrorAdapter = createSerializationAdapter({
  key: 'db-error',
  test: (v) => v instanceof DbError,
  toSerializable: ({ message, errors, statusCode, logging }) => {
    return {
      message,
      errors,
      logging,
      statusCode,
    }
  },
  fromSerializable: ({ message, statusCode, logging }) => {
    return new DbError({ message, code: statusCode, logging })
  },
})
