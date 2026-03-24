import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { series } from '@/db/schema'
import { authMiddleware } from '@/lib/middlewares/auth/authMiddleware'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'

export const removeSerie = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware, errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({ serieId: zd.number().int().positive() }),
    ),
  )
  .handler(async ({ data }) => {
    try {
      const editSerie = await db
        .delete(series)
        .where(eq(series.serieId, data.serieId))
        .returning()
        .then((res) => res[0])

      return {
        status: 200,
        message: `${editSerie.serieName} borttagen.`,
      }
    } catch (error) {
      catchError(error)
    }
  })
