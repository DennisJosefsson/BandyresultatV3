import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'

type ValidateGroupReturn =
  | {
      status: 404
      breadCrumb: string
      meta: Meta
    }
  | { status: 200; breadCrumb: string; serieName: string; meta: Meta }

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

      const title = `Bandyresultat - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
      const url = `https://bandyresultat.se/seasons/${year}/${group}?women=${women}`
      const description = `Serien ${group} ${seasonYear} ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }

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

      if (!serie) return { status: 404, breadCrumb: 'Grupp', meta }
      return {
        status: 200,
        breadCrumb: serie.serieName,
        serieName: serie.serieName,
        meta,
      }
    },
  )
