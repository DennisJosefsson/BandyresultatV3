import { db } from '@/db'
import { playoffseason, seasons } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { PlayoffGames } from '@/lib/types/game'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { getPlayoffGamesData } from './getPlayoffGamesData'

type Meta = {
  url: string
  description: string
  title: string
}

type GamesReturn =
  | {
      status: 200
      games: PlayoffGames
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }
  | undefined

export const getPlayoffGames = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ year: zd.number(), women: zd.boolean() })),
  )
  .handler(async ({ data: { year, women } }): Promise<GamesReturn> => {
    try {
      const seasonYear = seasonIdCheck.parse(year)
      const breadCrumb = `Matcher`
      const title = `Bandyresultat - Slutspelsmatcher - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
      const url = `https://bandyresultat.se/seasons/${year}/playoff/games?women=${women}`
      const description = `Slutspelsmatcher säsongen ${seasonYear} för ${women ? 'damer' : 'herrar'}`
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

      const results = await getPlayoffGamesData({ playoffSeason })
      if (!results) {
        return {
          status: 404,
          message: 'Inga slutspelmatcher inlagda.',
          breadCrumb,
          meta,
        }
      }

      return { status: 200, games: results, breadCrumb, meta }
    } catch (error) {
      catchError(error)
    }
  })
