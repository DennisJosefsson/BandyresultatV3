import { db } from '@/db'
import { errors } from '@/db/schema'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { getRequestIP } from '@tanstack/react-start/server'
import { catchError } from './catchError'

export const logErrorSchema = zd.object({
  name: zd.string(),
  message: zd.string(),
  body: zd.string().optional(),
  production: zd.boolean(),
  backend: zd.boolean(),
  date: zd.string(),
})

export const inputSchema = logErrorSchema.omit({
  production: true,
})

export const logError = createServerFn({ method: 'POST' })
  .validator(inputSchema)
  .handler(async ({ data }) => {
    const ip = getRequestIP()
    try {
      const origin = ip ?? 'Ingen IP'
      const insertedData = await db
        .insert(errors)
        .values({
          production: process.env.NODE_ENV === 'production',
          origin,
          ...data,
        })
        .returning()

      return {
        status: 200,
        message: insertedData
          .map((i) => i.message)
          .join(', '),
      }
    } catch (error) {
      catchError(error)
    }
  })
