import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { zd } from '@/lib/utils/zod'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { parentchildseries } from '@/db/schema'
import { db } from '@/db'

export const removeParentChildSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(zd.object({ id: zd.number().int().positive() })))
  .handler(async ({ data }) => {
    try {
      await db.delete(parentchildseries).where(eq(parentchildseries.id, data.id))

      return {
        status: 200,
        message: `ParentSerie borttagen.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
