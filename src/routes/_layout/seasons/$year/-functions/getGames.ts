import { db } from '@/db'
import { games, seasons, series, teams } from '@/db/schema'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { Games } from '@/lib/types/game'
import { Meta } from '@/lib/types/meta'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, asc, eq, getTableColumns, inArray, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { sortGames } from './gameSortFunction'

type GamesReturn =
  | {
      status: 200
      games: Games
      breadCrumb: string
      meta: Meta
    }
  | {
      status: 404
      message: string
      breadCrumb: string
      meta: Meta
    }

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getGames = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(
      zd.object({ group: zd.string(), year: zd.int(), women: zd.boolean() }),
    ),
  )
  .handler(async ({ data: { group, year, women } }): Promise<GamesReturn> => {
    const seasonYear = seasonIdCheck.parse(year)
    const breadCrumb = 'Matcher'
    const title = `Bandyresultat - Matcher - ${group} - ${women === true ? 'Damer' : 'Herrar'} ${seasonYear!}`
    const url = `https://bandyresultat.se/seasons/${year}/${group}/games?women=${women}`
    const description = `Matcher ${group} ${seasonYear} ${women ? 'damer' : 'herrar'}`
    const meta = {
      title,
      url,
      description,
    }
    if (!seasonYear) throw new Error('Säsongen finns inte.')
    const gamesArray = await db
      .select({
        ...getTableColumns(games),
        home: {
          teamId: home.teamId,
          name: home.name,
          casualName: home.casualName,
          shortName: home.shortName,
        } as unknown as SQL<{
          teamId: number
          name: string
          casualName: string
          shortName: string
        }>,
        away: {
          teamId: away.teamId,
          name: away.name,
          casualName: away.casualName,
          shortName: away.shortName,
        } as unknown as SQL<{
          teamId: number
          name: string
          casualName: string
          shortName: string
        }>,
      })
      .from(games)
      .leftJoin(seasons, eq(seasons.seasonId, games.seasonId))
      .leftJoin(home, eq(games.homeTeamId, home.teamId))
      .leftJoin(away, eq(games.awayTeamId, away.teamId))
      .where(
        and(
          eq(seasons.year, seasonYear),
          eq(games.women, women),
          inArray(games.group, [group, 'mix']),
        ),
      )
      .orderBy(asc(games.date))

    if (!gamesArray || gamesArray.length === 0) {
      return {
        status: 404,
        message: 'Inga matcher än denna säsong.',
        breadCrumb,
        meta,
      }
    }
    const season = await db.query.seasons.findFirst({
      where: (seasons, { eq, and }) =>
        and(eq(seasons.year, seasonYear), eq(seasons.women, women)),
    })
    if (!season)
      return { status: 404, message: 'Säsongen finns inte.', breadCrumb, meta }
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
    if (!serie)
      return {
        status: 404,
        message: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
        breadCrumb,
        meta,
      }

    const sortedGames = sortGames({ gamesArray, serie })

    return { status: 200, games: sortedGames, breadCrumb, meta }
  })
