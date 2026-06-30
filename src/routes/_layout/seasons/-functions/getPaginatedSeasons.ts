import { db } from '@/db'
import { seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import {
  preparedGroupsForPaginatedSeasons,
  preparedPagSeasons,
} from './preparedPaginatedSeasons'

export const parsePage = z.number().optional().catch(1)

export const getPaginatedSeasons = createServerFn({
  method: 'GET',
})
  .validator(zodValidator(parsePage))
  .handler(async ({ data }) => {
    try {
      const count = await db.$count(
        seasons,
        eq(seasons.women, false),
      )

      const page = data ?? 1

      const groups =
        await preparedGroupsForPaginatedSeasons.execute()

      const pagSeasons = await preparedPagSeasons.execute({
        offset: (page - 1) * 12,
      })

      const combinedSeasons = pagSeasons.map((s) => {
        const mensGroup = groups.find(
          (g) => g.year === s.year && g.women === false,
        )
        const womensGroup = groups.find(
          (g) => g.year === s.year && g.women === true,
        )
        return {
          ...s,
          mensGroup: mensGroup?.group ?? undefined,
          womensGroup: womensGroup?.group ?? undefined,
        }
      })

      return { count, seasons: combinedSeasons }
    } catch (error) {
      catchError(error)
    }
  })
