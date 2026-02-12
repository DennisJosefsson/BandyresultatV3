import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'

type ValidateGroupReturn =
  | {
      status: 404
    }
  | { status: 200 }

export const validateGroup = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({ group: zd.string(), year: zd.int(), women: zd.boolean() }),
    ),
  )
  .handler(
    async ({ data: { group, year, women } }): Promise<ValidateGroupReturn> => {
      const seasonYear = seasonIdCheck.parse(year)
      if (!seasonYear) throw new Error('Säsongen finns inte.')
      const serie = await db
        .select({
          ...getTableColumns(series),
        })
        .from(series)
        .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
        .where(
          and(
            eq(series.group, group),
            eq(seasons.women, women),
            eq(seasons.year, seasonYear),
          ),
        )
        .then((res) => {
          if (res.length > 0) return res[0]
          else return undefined
        })

      if (!serie) return { status: 404 }
      return { status: 200 }
    },
  )
