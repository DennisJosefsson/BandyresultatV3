import { db } from '@/db'
import { seasons, series } from '@/db/schema'
import { sortOrder } from '@/lib/utils/constants'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, asc, eq, inArray, ne } from 'drizzle-orm'

type Group = {
  group: string
  name: string
  serieId: number
}

type Meta = {
  url: string
  description: string
  title: string
}

type GroupReturn = Promise<
  | { status: 200; groups: Group[]; breadCrumb: string; meta: Meta }
  | { status: 204; groups: undefined; breadCrumb: string; meta: Meta }
>

export const getGroups = createServerFn({ method: 'GET' })
  .inputValidator(
    zodValidator(zd.object({ year: zd.number(), women: zd.boolean() })),
  )
  .handler(async ({ data: { year, women } }): GroupReturn => {
    const seasonYear = seasonIdCheck.parse(year)
    const breadCrumb = `${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
    const title = `Bandyresultat - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
    const url = `https://bandyresultat.se/seasons/${year}?women=${women}`
    const description = `Säsongen ${seasonYear} ${women ? 'damer' : 'herrar'}`
    const meta = {
      title,
      url,
      description,
    }
    if (year < 1973 && women) {
      return { status: 204, groups: undefined, breadCrumb, meta }
    }

    if (!seasonYear) throw new Error('Error!')
    const groups = await db
      .select({
        group: series.group,
        name: series.serieName,
        serieId: series.serieId,
      })
      .from(series)
      .leftJoin(seasons, eq(seasons.seasonId, series.seasonId))
      .where(
        and(
          eq(seasons.year, seasonYear),
          eq(seasons.women, women),
          inArray(series.category, ['regular', 'qualification']),
          ne(series.group, 'mix'),
        ),
      )
      .orderBy(asc(series.level), asc(series.category))
    return {
      status: 200,
      groups: groups.sort(
        (a, b) => sortOrder.indexOf(a.group) - sortOrder.indexOf(b.group),
      ),
      breadCrumb,
      meta,
    }
  })
