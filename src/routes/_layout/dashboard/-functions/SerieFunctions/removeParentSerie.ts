import { db } from '@/db'
import { parentchildseries } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const removeParentChildSerie = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(zd.object({ id: zd.number().int().positive() })))
  .handler(async ({ data }) => {
    try {
      await db
        .delete(parentchildseries)
        .where(eq(parentchildseries.id, data.id))

      return { status: 200, message: `ParentSerie borttagen.` }
    } catch (error) {
      catchError(error)
    }
  })
