import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Game } from '@/lib/types/game'
import { Serie } from '@/lib/types/serie'
import { ReturnDevDataTableItem } from '@/lib/types/table'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getDevelopmentData } from './devDataFunctions'

type DevDataReturn =
  | {
      status: 200
      tables: { date: string; table: ReturnDevDataTableItem[] }[]
      games: { date: string; games: Omit<Game, 'season'>[] }[]
      serie: Serie
      dates: string[]
    }
  | {
      status: 404
      message: string
    }
  | undefined

export const getDevData = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        group: zd.string(),
        year: zd.int(),
        women: zd.boolean(),
      }),
    ),
  )
  .handler(async ({ data: { group, year, women } }): Promise<DevDataReturn> => {
    try {
      if (year < 1930) {
        return {
          status: 404,
          message: 'Inga serietabeller för den här säsongen',
        }
      }

      if (year < 1973 && women) {
        return {
          status: 404,
          message: 'Damernas första säsong var 1972/1973.',
        }
      }
      const seasonYear = seasonIdCheck.parse(year)
      if (!seasonYear) {
        return { status: 404, message: 'Säsongen finns inte.' }
      }

      const serie = await db
        .select({
          ...getTableColumns(series),
        })
        .from(series)
        .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
        .where(
          and(
            eq(seasons.women, women),
            eq(seasons.year, seasonYear),
            eq(series.group, group),
          ),
        )
        .then((res) => {
          if (res.length > 0) return res[0]
          else return undefined
        })

      if (!serie) return { status: 404, message: 'Serien finns inte.' }

      if (serie.hasStatic) {
        return { status: 404, message: 'Serien har enbart sluttabell.' }
      }

      const results = await getDevelopmentData({ serie })

      return {
        status: 200,
        ...results,
        serie,
      }
    } catch (error) {
      catchError(error)
    }
  })
