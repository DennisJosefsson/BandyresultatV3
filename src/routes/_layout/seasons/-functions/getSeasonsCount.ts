import { db } from '@/db'
import { seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const searchParams = zd.object({
  women: zd.boolean(),
})

type CountReturn =
  | {
      status: 200
      count: number
    }
  | { status: 404; count: number; message: string }
  | undefined

export const getSeasonsCount = createServerFn({
  method: 'GET',
})
  .validator(searchParams)
  .handler(async ({ data }): Promise<CountReturn> => {
    try {
      const count = await db.$count(
        seasons,
        eq(seasons.women, data.women),
      )

      return { status: 200, count }
    } catch (error) {
      catchError(error)
    }
  })
