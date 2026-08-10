import { db } from '@/db'
import type { errors } from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'

type ErrorReturn =
  | {
      status: 200
      error: typeof errors.$inferSelect
    }
  | { status: 404; message: string }
  | undefined

const validateId = zd.object({ errorId: zd.number() })

export const getSingleError = createServerFn({
  method: 'GET',
})
  .validator(validateId)
  .middleware([errorMiddleware])
  .handler(
    async ({ data: { errorId } }): Promise<ErrorReturn> => {
      try {
        const error = await db.query.errors.findFirst({
          where: (errors, { eq }) =>
            eq(errors.errorId, errorId),
        })

        if (!error) {
          throw new Error404({
            message: `Finns inget error med id ${errorId}.`,
          })
        }

        return {
          status: 200,
          error,
        }
      } catch (error) {
        if (error instanceof Error404) {
          return { status: 404, message: error.message }
        }
        catchError(error)
      }
    },
  )
