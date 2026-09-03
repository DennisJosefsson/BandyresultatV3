import { db } from '@/db'
import {
  competitions,
  games,
  series,
  teams,
} from '@/db/schema'
import Error404 from '@/lib/middlewares/errors/404Error'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import type { Game } from '@/lib/types/game'
import type { TeamBase } from '@/lib/types/team'
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
            name: home.name,
            shortName: home.shortName,
            casualName: home.casualName,
          } as unknown as SQL<TeamBase>,
          away: {
            teamId: away.teamId,
            name: away.name,
            shortName: away.shortName,
            casualName: away.casualName,
          } as unknown as SQL<TeamBase>,
        })
        .from(games)
        .leftJoin(home, eq(home.teamId, games.homeTeamId))
        .leftJoin(away, eq(away.teamId, games.awayTeamId))
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
