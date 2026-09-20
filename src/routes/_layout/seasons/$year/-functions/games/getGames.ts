import { db } from '@/db'
import {
  games,
  seasons,
  series,
  teamlogos,
  teamnames,
  teams,
  teamseasons,
} from '@/db/schema'
import { getSortPlayedGamesServerFn } from '@/lib/cookieFunctions/sortPlayedGames'
import { getSortUnplayedGamesServerFn } from '@/lib/cookieFunctions/sortUnplayedGames'
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Games } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import type { TeamBaseWithLogo } from '@/lib/types/team'
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
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { sortGames } from './gameSortFunction'

type GamesReturn =
  | {
      status: 200
      games: Games
      serie: Serie
    }
  | {
      status: 404
      message: string
    }
  | undefined

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamSeason = alias(teamseasons, 'home_teamseason')
const awayTeamSeason = alias(teamseasons, 'away_teamseason')
const homeTeamName = alias(teamnames, 'home_teamname')
const awayTeamName = alias(teamnames, 'away_teamname')
const homeTeamSeasonName = alias(
  teamnames,
  'home_teamseasonname',
)
const awayTeamSeasonName = alias(
  teamnames,
  'away_teamseasonname',
)
const homeLogo = alias(teamlogos, 'home_logo')
const awayLogo = alias(teamlogos, 'away_logo')
const homeTeamSeasonLogo = alias(
  teamlogos,
  'home_teamseasonlogo',
)
const awayTeamSeasonLogo = alias(
  teamlogos,
  'away_teamseasonlogo',
)

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
              eq(seasons.intYear, year),
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
            group: series.group as unknown as SQL<string>,
            category:
              series.category as unknown as SQL<string>,
            home: {
              teamId: home.teamId,
              name: coalesce(
                homeTeamSeasonName.name,
                homeTeamName.name,
              ),
              casualName: coalesce(
                homeTeamSeasonName.casualName,
                homeTeamName.casualName,
              ),
              shortName: coalesce(
                homeTeamSeasonName.shortName,
                homeTeamName.shortName,
              ),
              logo: {
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              },
            } as unknown as SQL<TeamBaseWithLogo>,
            away: {
              teamId: away.teamId,
              name: coalesce(
                awayTeamSeasonName.name,
                awayTeamName.name,
              ),
              casualName: coalesce(
                awayTeamSeasonName.casualName,
                awayTeamName.casualName,
              ),
              shortName: coalesce(
                awayTeamSeasonName.shortName,
                awayTeamName.shortName,
              ),
              logo: {
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              },
            } as unknown as SQL<TeamBaseWithLogo>,
          })
          .from(games)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, games.seasonId),
          )
          .leftJoin(home, eq(games.homeTeamId, home.teamId))
          .leftJoin(away, eq(games.awayTeamId, away.teamId))
          .leftJoin(
            homeTeamSeason,
            and(
              eq(homeTeamSeason.seasonId, seasons.seasonId),
              eq(homeTeamSeason.teamId, games.homeTeamId),
            ),
          )
          .leftJoin(
            awayTeamSeason,
            and(
              eq(awayTeamSeason.seasonId, seasons.seasonId),
              eq(awayTeamSeason.teamId, games.awayTeamId),
            ),
          )
          .leftJoin(
            homeTeamName,
            eq(home.teamnameId, homeTeamName.teamnameId),
          )
          .leftJoin(
            awayTeamName,
            eq(away.teamnameId, awayTeamName.teamnameId),
          )
          .leftJoin(
            homeTeamSeasonName,
            eq(
              homeTeamSeason.teamnameId,
              homeTeamSeasonName.teamnameId,
            ),
          )
          .leftJoin(
            awayTeamSeasonName,
            eq(
              awayTeamSeason.teamnameId,
              awayTeamSeasonName.teamnameId,
            ),
          )
          .leftJoin(
            homeLogo,
            eq(homeTeamName.logoId, homeLogo.logoId),
          )
          .leftJoin(
            awayLogo,
            eq(awayTeamName.logoId, awayLogo.logoId),
          )
          .leftJoin(
            homeTeamSeasonLogo,
            eq(
              homeTeamSeasonName.logoId,
              homeTeamSeasonLogo.logoId,
            ),
          )
          .leftJoin(
            awayTeamSeasonLogo,
            eq(
              awayTeamSeasonName.logoId,
              awayTeamSeasonLogo.logoId,
            ),
          )
          .leftJoin(
            series,
            eq(series.serieId, games.serieId),
          )
          .where(
            and(
              eq(games.played, true),
              eq(seasons.intYear, year),
              eq(games.women, women),
              inArray(series.group, [group, 'mix']),
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
            group: series.group as unknown as SQL<string>,
            category:
              series.category as unknown as SQL<string>,
            home: {
              teamId: home.teamId,
              name: coalesce(
                homeTeamSeasonName.name,
                homeTeamName.name,
              ),
              casualName: coalesce(
                homeTeamSeasonName.casualName,
                homeTeamName.casualName,
              ),
              shortName: coalesce(
                homeTeamSeasonName.shortName,
                homeTeamName.shortName,
              ),
              logo: {
                logoId: coalesce(
                  homeTeamSeasonLogo.logoId,
                  homeLogo.logoId,
                ),
                hasDark: coalesce(
                  homeTeamSeasonLogo.hasDark,
                  homeLogo.hasDark,
                ),
              },
            } as unknown as SQL<TeamBaseWithLogo>,
            away: {
              teamId: away.teamId,
              name: coalesce(
                awayTeamSeasonName.name,
                awayTeamName.name,
              ),
              casualName: coalesce(
                awayTeamSeasonName.casualName,
                awayTeamName.casualName,
              ),
              shortName: coalesce(
                awayTeamSeasonName.shortName,
                awayTeamName.shortName,
              ),
              logo: {
                logoId: coalesce(
                  awayTeamSeasonLogo.logoId,
                  awayLogo.logoId,
                ),
                hasDark: coalesce(
                  awayTeamSeasonLogo.hasDark,
                  awayLogo.hasDark,
                ),
              },
            } as unknown as SQL<TeamBaseWithLogo>,
          })
          .from(games)
          .leftJoin(
            seasons,
            eq(seasons.seasonId, games.seasonId),
          )
          .leftJoin(home, eq(games.homeTeamId, home.teamId))
          .leftJoin(away, eq(games.awayTeamId, away.teamId))
          .leftJoin(
            homeTeamSeason,
            and(
              eq(homeTeamSeason.seasonId, games.seasonId),
              eq(homeTeamSeason.teamId, games.homeTeamId),
            ),
          )
          .leftJoin(
            awayTeamSeason,
            and(
              eq(awayTeamSeason.seasonId, games.seasonId),
              eq(awayTeamSeason.teamId, games.awayTeamId),
            ),
          )
          .leftJoin(
            homeTeamName,
            eq(home.teamnameId, homeTeamName.teamnameId),
          )
          .leftJoin(
            awayTeamName,
            eq(away.teamnameId, awayTeamName.teamnameId),
          )
          .leftJoin(
            homeTeamSeasonName,
            eq(
              homeTeamSeason.teamnameId,
              homeTeamSeasonName.teamnameId,
            ),
          )
          .leftJoin(
            awayTeamSeasonName,
            eq(
              awayTeamSeason.teamnameId,
              awayTeamSeasonName.teamnameId,
            ),
          )
          .leftJoin(
            homeLogo,
            eq(homeTeamName.logoId, homeLogo.logoId),
          )
          .leftJoin(
            awayLogo,
            eq(awayTeamName.logoId, awayLogo.logoId),
          )
          .leftJoin(
            homeTeamSeasonLogo,
            eq(
              homeTeamSeasonName.logoId,
              homeTeamSeasonLogo.logoId,
            ),
          )
          .leftJoin(
            awayTeamSeasonLogo,
            eq(
              awayTeamSeasonName.logoId,
              awayTeamSeasonLogo.logoId,
            ),
          )
          .leftJoin(
            series,
            eq(series.serieId, games.serieId),
          )
          .where(
            and(
              eq(games.played, false),
              eq(seasons.intYear, year),
              eq(games.women, women),
              inArray(series.group, [group, 'mix']),
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

        const sortedGames = sortGames({
          playedGamesArray,
          unplayedGamesArray,
          serie,
        })

        return {
          status: 200,
          games: sortedGames,

          serie,
        }
      } catch (error) {
        catchError(error)
      }
    },
  )
