import { db } from '@/db'
import { county } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { createServerFn } from '@tanstack/react-start'

export const getCountiesForTeamForm = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .handler(async () => {
    try {
      const countyList = await db
        .select()
        .from(county)
        .then((res) =>
          res.map((county) => {
            return { value: county.countyId, label: county.name }
          }),
        )
      return { status: 200, counties: countyList }
    } catch (error) {
      catchError(error)
    }
  })
