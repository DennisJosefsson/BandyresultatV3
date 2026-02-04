import { db } from '@/db'
import { municipality } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'

export const getMunicipalitiesForTeamForm = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ countyId: zd.number().int().positive() })),
  )
  .handler(async ({ data: { countyId } }) => {
    try {
      const muniList = await db
        .select()
        .from(municipality)
        .where(eq(municipality.countyId, countyId))
        .then((res) =>
          res.map((muni) => {
            return { value: muni.municipalityId, label: muni.name }
          }),
        )
      return { status: 200, municipalities: muniList }
    } catch (error) {
      catchError(error)
    }
  })
