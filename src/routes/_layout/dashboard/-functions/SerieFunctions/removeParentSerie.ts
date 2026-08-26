import { db } from '@/db'
import { parentchildseries, series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { eq, inArray } from 'drizzle-orm'

export const removeParentChildSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(
    zd.object({ id: zd.number().int().positive() }),
  )
  .handler(async ({ data }) => {
    try {
      await db
        .delete(parentchildseries)
        .where(eq(parentchildseries.id, data.id))
        .returning({
          deletedChildId: parentchildseries.childId,
        })
        .then(async (res) => {
          const resArray = res.map((r) => r.deletedChildId)
          
          const existingParents = await db
            .select()
            .from(parentchildseries)
            .where(
              inArray(parentchildseries.childId, resArray),
            )
          
          if (existingParents.length > 0) return
          else
            await db
              .update(series)
              .set({
                hasParent: false,
                allParentGames: false,
              })
              .where(inArray(series.serieId, resArray))
        })

      return {
        status: 200,
        message: `ParentSerie borttagen.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
