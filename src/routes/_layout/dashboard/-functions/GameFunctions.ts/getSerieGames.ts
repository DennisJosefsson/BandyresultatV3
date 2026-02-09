import { db } from '@/db'
import { games, seasons, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { errorMiddleware } from '@/lib/middlewares/errors/errorMiddleware'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { asc, eq, getTableColumns, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getSerieGames = createServerFn({ method: 'GET' })
  .middleware([errorMiddleware])
  .inputValidator(
    zodValidator(zd.object({ serieId: zd.number().positive().int() })),
  )
  .handler(async ({ data: { serieId } }) => {
    try {
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
        .where(eq(games.serieId, serieId))
        .orderBy(asc(games.date))

      if (!gamesArray || gamesArray.length === 0) {
        return { status: 404, message: 'Inga matcher än denna säsong.' }
      }

      const playedGames = gamesArray.filter((game) => game.played === true)
      const unplayedGames = gamesArray.filter((game) => game.played === false)

      return { status: 200, playedGames, unplayedGames }
    } catch (error) {
      catchError(error)
    }
  })
