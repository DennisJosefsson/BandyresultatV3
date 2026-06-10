import { createSerializationAdapter } from '@tanstack/react-router'
import { CustomError } from './CustomError'

export default class ZodParsingError extends CustomError {
  private static readonly _statusCode = 400
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

    super(message || 'Bad request')
    this._code = code || ZodParsingError._statusCode
    this._logging = logging || false
    this._context = params?.context || {}

    Object.setPrototypeOf(this, ZodParsingError.prototype)
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
}

export const zodParsingErrorAdapter = createSerializationAdapter({
  key: 'compare-request-error',
  test: (v) => v instanceof ZodParsingError,
  toSerializable: ({ message, errors, statusCode, logging }) => {
    return {
      message,
      errors,
      logging,
      statusCode,
    }
  },
  fromSerializable: ({ message, statusCode, logging }) => {
    return new ZodParsingError({ message, code: statusCode, logging })
  },
})
