import { db } from '@/db'
import { games, playoffseason, seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Stats } from '@/lib/types/stats'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getPlayoffStatsData } from './getPlayoffStatsData'

type Meta = {
  url: string
  description: string
  title: string
}
type GroupStatsReturn =
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | (Stats & { breadCrumb: string; meta: Meta })
  | undefined

export const getPlayoffStats = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({
        year: zd.int(),
        women: zd.boolean(),
      }),
    ),
  )
  .handler(async ({ data: { year, women } }): Promise<GroupStatsReturn> => {
    try {
      const seasonYear = seasonIdCheck.parse(year)
      const breadCrumb = `Statistik`
      const title = `Bandyresultat - Statistik slutspelsmatcher - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
      const url = `https://bandyresultat.se/seasons/${year}/playoff/stats?women=${women}`
      const description = `Statistik slutspelsmatcher säsongen ${seasonYear} för ${women ? 'damer' : 'herrar'}`
      const meta = {
        title,
        url,
        description,
      }
      if (year < 1973 && women) {
        return {
          status: 404,
          message: 'Damernas första säsong var 1972/1973.',
          breadCrumb,
          meta,
        }
      }

      const season = await db.query.seasons.findFirst({
        where: (seasons, { and, eq }) =>
          and(eq(seasons.year, seasonYear!), eq(seasons.women, women)),
      })

      if (!season) {
        return {
          status: 404,
          message: 'Säsongen finns inte.',
          breadCrumb,
          meta,
        }
      }

      const playoffSeasonArr = await db
        .select({ ...getTableColumns(playoffseason) })
        .from(playoffseason)
        .leftJoin(seasons, eq(seasons.seasonId, playoffseason.seasonId))
        .where(
          and(eq(seasons.seasonId, season.seasonId), eq(seasons.women, women)),
        )

      if (playoffSeasonArr.length === 0) {
        return {
          status: 404,
          message: 'Ingen slutspelsdata.',
          breadCrumb,
          meta,
        }
      }

      const playoffSeason = playoffSeasonArr[0]

      const gameCount = await db.$count(
        games,
        and(
          eq(games.seasonId, playoffSeason.seasonId),
          eq(games.played, true),
          eq(games.playoff, true),
        ),
      )

      if (gameCount === 0) {
        return {
          status: 404,
          message: 'Serien har inga spelade matcher.',
          breadCrumb,
          meta,
        }
      }

      const data = await getPlayoffStatsData({ playoffSeason })

      return { status: 200, gameCount, ...data, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
