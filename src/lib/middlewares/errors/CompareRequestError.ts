import { createSerializationAdapter } from '@tanstack/react-router'
import { CustomError } from './CustomError'

export default class CompareRequestError extends CustomError {
  private static readonly _statusCode = 400
  private readonly _code: 404 | 400
  private readonly _logging: boolean
  private readonly _context: { [key: string]: string }
  private readonly _url: string | undefined
  private readonly _breadCrumb: string | undefined
  private readonly _teamArray: Array<number> | undefined

  constructor(params?: {
    code: 404 | 400
    message?: string
    logging?: boolean
    url?: string
    breadCrumb?: string
    teamArray?: Array<number>
    context?: { [key: string]: string }
  }) {
    const {
      code,
      message,
      logging,
      context,
      url,
      breadCrumb,
      teamArray,
    } = params || {}

    super(message || 'Bad request')
    this._code = code || CompareRequestError._statusCode
    this._logging = logging || code === 400
    this._context = context || {}
    this._url = url
    this._breadCrumb = breadCrumb
    this._teamArray = teamArray

    Object.setPrototypeOf(
      this,
      CompareRequestError.prototype,
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

  get url() {
    return this._url
  }

  get breadCrumb() {
    return this._breadCrumb
  }

  get teamArray() {
    return this._teamArray
  }
}

export const compareRequestErrorAdapter =
  createSerializationAdapter({
    key: 'compare-request-error',
    test: (v) => v instanceof CompareRequestError,
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
      return new CompareRequestError({
        message,
        code: statusCode,
        logging,
      })
    },
  })
