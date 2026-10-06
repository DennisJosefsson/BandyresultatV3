import { db } from '@/db'
import { errors } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq, getTableColumns } from 'drizzle-orm'

type BandyError = typeof errors.$inferSelect

type ErrorReturn =
  | {
      production: {
        backend: {
          errors: Array<BandyError>
          count: number
        }
        frontend: {
          errors: Array<BandyError>
          count: number
        }
      }
      development: {
        backend: {
          errors: Array<BandyError>
          count: number
        }
        frontend: {
          errors: Array<BandyError>
          count: number
        }
      }
    }
  | undefined

export const getErrors = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async (): Promise<ErrorReturn> => {
    try {
      const backendProduction = await db
        .select({ ...getTableColumns(errors) })
        .from(errors)
        .where(
          and(
            eq(errors.backend, true),
            eq(errors.production, true),
          ),
        )
        .orderBy(desc(errors.errorId))
        .limit(10)
      const frontendProduction = await db
        .select({ ...getTableColumns(errors) })
        .from(errors)
        .where(
          and(
            eq(errors.backend, false),
            eq(errors.production, true),
          ),
        )
        .orderBy(desc(errors.errorId))
        .limit(10)

      const backendDevelopment = await db
        .select({ ...getTableColumns(errors) })
        .from(errors)
        .where(
          and(
            eq(errors.backend, true),
            eq(errors.production, false),
          ),
        )
        .orderBy(desc(errors.errorId))
        .limit(10)
      const frontendDevelopment = await db
        .select({ ...getTableColumns(errors) })
        .from(errors)
        .where(
          and(
            eq(errors.backend, false),
            eq(errors.production, false),
          ),
        )
        .orderBy(desc(errors.errorId))
        .limit(10)

      const backendProductionCount = await db.$count(
        errors,
        and(
          eq(errors.backend, true),
          eq(errors.production, true),
        ),
      )
      const frontendProductionCount = await db.$count(
        errors,
        and(
          eq(errors.backend, false),
          eq(errors.production, true),
        ),
      )

      const backendDevelopmentCount = await db.$count(
        errors,
        and(
          eq(errors.backend, true),
          eq(errors.production, false),
        ),
      )
      const frontendDevelopmentCount = await db.$count(
        errors,
        and(
          eq(errors.backend, false),
          eq(errors.production, false),
        ),
      )

      return {
        production: {
          backend: {
            errors: backendProduction,
            count: backendProductionCount,
          },
          frontend: {
            errors: frontendProduction,
            count: frontendProductionCount,
          },
        },
        development: {
          backend: {
            errors: backendDevelopment,
            count: backendDevelopmentCount,
          },
          frontend: {
            errors: frontendDevelopment,
            count: frontendDevelopmentCount,
          },
        },
      }
    } catch (error) {
      catchError(error)
    }
  })
