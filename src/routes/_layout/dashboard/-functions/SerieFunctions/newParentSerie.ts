import { eq } from 'drizzle-orm'
import { zodValidator } from '@tanstack/zod-adapter'
import { createServerFn } from '@tanstack/react-start'
import { newParentSerieObject } from '@/lib/types/serie'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { parentchildseries, series } from '@/db/schema'
import { db } from '@/db'

export const newParentSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(zodValidator(newParentSerieObject))
  .handler(async ({ data }) => {
    try {
      const newParentSerie = await db
        .insert(parentchildseries)
        .values(data)
        .returning()
        .then(
          async () =>
            await db
              .select({ serieName: series.serieName })
              .from(series)
              .where(eq(series.serieId, data.parentId))
              .then((res) => res[0]),
        )

      return {
        status: 200,
        message: `${newParentSerie.serieName} inlagd som ParentSerie.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
