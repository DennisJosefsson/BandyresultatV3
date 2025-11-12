import { db } from '@/db'
import { seasons } from '@/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const page = z.number().catch(1)

export const getPaginatedSeasons = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(page))
  .handler(async ({ data }) => {
    const count = await db.$count(seasons, eq(seasons.women, false))

    const pagSeasons = await db.query.seasons.findMany({
      columns: { seasonId: true, year: true },
      where: (seasons, { eq }) => eq(seasons.women, false),
      offset: (data - 1) * 12,
      limit: 12,
      orderBy: (seasons, { desc }) => desc(seasons.seasonId),
    })
    return { count, seasons: pagSeasons }
  })
