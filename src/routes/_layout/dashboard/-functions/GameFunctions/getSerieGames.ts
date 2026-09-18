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
import { coalesce } from '@/lib/drizzleHelpers/coalesce'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import { and, asc, eq, getTableColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

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

export const getSerieGames = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .validator(
    zd.object({
      serieId: zd.number().positive().int(),
    }),
  )
  .handler(async ({ data: { serieId } }) => {
    try {
      const gamesArray = await db
        .select({
          ...getTableColumns(games),
          category:
            series.category as unknown as SQL<string>,
          group: series.group as unknown as SQL<string>,
          home: {
            teamId: home.teamId,
            name: coalesce(
              homeTeamName.name,
              homeTeamSeasonName.name,
            ),
            casualName: coalesce(
              homeTeamName.casualName,
              homeTeamSeasonName.casualName,
            ),
            shortName: coalesce(
              homeTeamName.shortName,
              homeTeamSeasonName.shortName,
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
              awayTeamName.name,
              awayTeamSeasonName.name,
            ),
            casualName: coalesce(
              awayTeamName.casualName,
              awayTeamSeasonName.casualName,
            ),
            shortName: coalesce(
              awayTeamName.shortName,
              awayTeamSeasonName.shortName,
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
        .leftJoin(series, eq(series.serieId, games.serieId))
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
            home.teamnameId,
            homeTeamSeasonName.teamnameId,
          ),
        )
        .leftJoin(
          awayTeamSeasonName,
          eq(
            away.teamnameId,
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
            homeTeamName.logoId,
            homeTeamSeasonLogo.logoId,
          ),
        )
        .leftJoin(
          awayTeamSeasonLogo,
          eq(
            awayTeamName.logoId,
            awayTeamSeasonLogo.logoId,
          ),
        )
        .where(eq(games.serieId, serieId))
        .orderBy(asc(games.date))

      if (!gamesArray || gamesArray.length === 0) {
        return {
          status: 404,
          message: 'Inga matcher än denna säsong.',
        }
      }

      const playedGames = gamesArray.filter(
        (game) => game.played === true,
      )
      const unplayedGames = gamesArray.filter(
        (game) => game.played === false,
      )

      return { status: 200, playedGames, unplayedGames }
    } catch (error) {
      catchError(error)
    }
  })
