import { db } from '@/db'
import {
  games,
  seasons,
  series,
  teams,
  teamseries,
} from '@/db/schema'
import { getSortPlayedGamesServerFn } from '@/lib/cookieFunctions/sortPlayedGames'
import { getSortUnplayedGamesServerFn } from '@/lib/cookieFunctions/sortUnplayedGames'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Games } from '@/lib/types/game'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { sortGames } from './gameSortFunction'

type TeamArray = {
  teamId: number
  casualName: string
}

type GamesReturn =
  | {
      status: 200
      games: Games
      teamArray: Array<TeamArray>
    }
  | {
      status: 404
      message: string
    }
  | undefined

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getGames = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      group: zd.string(),
      year: zd.int(),
      women: zd.boolean(),
    }),
  )
  .handler(
    async ({
      data: { group, year, women },
    }): Promise<GamesReturn> => {
      try {
        const seasonYear = seasonIdCheck.parse(year)
        if (!seasonYear)
          return {
            status: 404,
            message: 'Säsongen finns inte.',
          }

        if (year < 1930) {
          return {
            status: 404,
            message:
              'Inga seriematcher inlagda denna säsong.',
          }
        }

        const serie = await db
          .select({
            ...getTableColumns(series),
          })
          .from(series)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, series.seasonId),
          )
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
          }

        if (serie.hasStatic) {
          return {
            status: 404,
            message: `Inga matcher inlagda för den här serien det här året, enbart sluttabell.`,
          }
        }

        const sortPlayedGames =
          await getSortPlayedGamesServerFn()
        const sortUnplayedGames =
          await getSortUnplayedGamesServerFn()

        const playedGamesArray = await db
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
          .leftJoin(
            seasons,
            eq(seasons.seasonId, games.seasonId),
          )
          .leftJoin(home, eq(games.homeTeamId, home.teamId))
          .leftJoin(away, eq(games.awayTeamId, away.teamId))
          .where(
            and(
              eq(games.played, true),
              eq(seasons.year, seasonYear),
              eq(games.women, women),
              inArray(games.group, [group, 'mix']),
            ),
          )
          .orderBy(
            sortPlayedGames === 'asc'
              ? asc(games.date)
              : desc(games.date),
          )

        const unplayedGamesArray = await db
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
          .leftJoin(
            seasons,
            eq(seasons.seasonId, games.seasonId),
          )
          .leftJoin(home, eq(games.homeTeamId, home.teamId))
          .leftJoin(away, eq(games.awayTeamId, away.teamId))
          .where(
            and(
              eq(games.played, false),
              eq(seasons.year, seasonYear),
              eq(games.women, women),
              inArray(games.group, [group, 'mix']),
            ),
          )
          .orderBy(
            sortUnplayedGames === 'asc'
              ? asc(games.date)
              : desc(games.date),
          )

        if (
          playedGamesArray.length +
            unplayedGamesArray.length ===
          0
        ) {
          return {
            status: 404,
            message: 'Inga matcher än denna säsong.',
          }
        }
        const season = await db.query.seasons.findFirst({
          where: (seasonsSchema, { eq: equal, and: AND }) =>
            AND(
              equal(seasonsSchema.year, seasonYear),
              equal(seasonsSchema.women, women),
            ),
        })
        if (!season)
          return {
            status: 404,
            message: 'Säsongen finns inte.',
          }

        const sortedGames = sortGames({
          playedGamesArray,
          unplayedGamesArray,
          serie,
        })

        const teamArray = await db
          .select({
            teamId: teams.teamId as unknown as SQL<number>,
            casualName:
              teams.casualName as unknown as SQL<string>,
          })
          .from(teamseries)
          .leftJoin(
            teams,
            eq(teamseries.teamId, teams.teamId),
          )
          .where(eq(teamseries.serieId, serie.serieId))
          .orderBy(
            asc(sql`casual_name collate "se-SE-x-icu"`),
          )

        return {
          status: 200,
          games: sortedGames,
          teamArray,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
