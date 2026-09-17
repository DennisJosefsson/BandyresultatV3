import { db } from '@/db'
import {
  competitions,
  games,
  series,
  teamlogos,
  teamnames,
  teams,
} from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Game } from '@/lib/types/game'
import type { TeamBaseWithLogo } from '@/lib/types/team'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  asc,
  between,
  eq,
  getTableColumns,
  sql,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamName = alias(teamnames, 'home_teamname')
const awayTeamName = alias(teamnames, 'away_teamname')
const homeTeamLogo = alias(teamlogos, 'home_teamlogo')
const awayTeamLogo = alias(teamlogos, 'away_teamlogo')

type ReturnType =
  | {
      status: 200
      games: Array<
        Omit<Game, 'season'> & {
          serie: { serieName: string }
        } & { competition: { competitionName: string } }
      >
    }
  | { status: 404; message: string }
  | undefined

export const getIndexGames = createServerFn({
  method: 'GET',
})
  .middleware([errorMiddleware])
  .handler(async (): Promise<ReturnType> => {
    try {
      const gameArray = await db
        .select({
          ...getTableColumns(games),
          group: series.group as unknown as SQL<string>,
          category:
            series.category as unknown as SQL<string>,
          serie: {
            serieName:
              series.serieName as unknown as SQL<string>,
          },
          competition: {
            competitionName:
              competitions.competitionName as unknown as SQL<string>,
          },
          home: {
            teamId: home.teamId,
            name: homeTeamName.name,
            shortName: homeTeamName.shortName,
            casualName: homeTeamName.casualName,
            logo: {
              logoId: homeTeamLogo.logoId,
              hasDark: homeTeamLogo.hasDark,
            },
          } as unknown as SQL<TeamBaseWithLogo>,
          away: {
            teamId: away.teamId,
            name: awayTeamName.name,
            shortName: awayTeamName.shortName,
            casualName: awayTeamName.casualName,
            logo: {
              logoId: awayTeamLogo.logoId,
              hasDark: awayTeamLogo.hasDark,
            },
          } as unknown as SQL<TeamBaseWithLogo>,
        })
        .from(games)
        .leftJoin(home, eq(home.teamId, games.homeTeamId))
        .leftJoin(away, eq(away.teamId, games.awayTeamId))
        .leftJoin(
          homeTeamName,
          eq(homeTeamName.teamnameId, home.teamnameId),
        )
        .leftJoin(
          homeTeamLogo,
          eq(homeTeamLogo.logoId, homeTeamName.logoId),
        )
        .leftJoin(
          awayTeamName,
          eq(awayTeamName.teamnameId, away.teamnameId),
        )
        .leftJoin(
          awayTeamLogo,
          eq(awayTeamLogo.logoId, awayTeamName.logoId),
        )
        .leftJoin(series, eq(series.serieId, games.serieId))
        .leftJoin(
          competitions,
          eq(
            series.competitionId,
            competitions.competitionId,
          ),
        )
        .where(
          between(
            games.date,
            sql`current_date`,
            sql`current_date + 3`,
          ),
        )
        .orderBy(asc(games.date), asc(series.level))

      if (gameArray.length === 0) {
        throw new Error404({
          message: 'Inga matcher under perioden',
        })
      }
      return { status: 200, games: gameArray }
    } catch (error) {
      if (error instanceof Error404) {
        return { status: 404, message: error.message }
      }
      catchError(error)
    }
  })
