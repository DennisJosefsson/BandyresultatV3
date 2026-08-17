import { db } from '@/db'
import { parentchildseries, series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { newParentSerieObject } from '@/lib/types/serie'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const newParentSerieInput = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .validator(newParentSerieObject)
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

      const returnValue = await db
        .update(series)
        .set({ hasParent: true })
        .where(eq(series.serieId, data.childId))
        .returning({ serieName: series.serieName })

      return {
        status: 200,
        message: `${newParentSerie.serieName} inlagd som ParentSerie till ${returnValue.at(0)?.serieName}. Glöm inte att uppdatera allParentGames-variablen om det behövs.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
