import { db } from '@/db'
import { parentchildseries, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newParentSerieObject } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const newParentSerieInput = createServerFn({ method: 'POST' })
  .middleware([errorMiddleware])
  .inputValidator(zodValidator(newParentSerieObject))
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
