import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { TeamBaseWithTeamGameId } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'

import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, eq, getTableColumns, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamGame = alias(teamgames, 'home_teamgame')
const awayTeamGame = alias(teamgames, 'away_teamgame')

export const getSingleGame = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(zd.object({ gameId: zd.number() })))
  .handler(async ({ data: { gameId } }) => {
    try {
      const game = await db
        .select({
          ...getTableColumns(games),
          home: {
            teamId: home.teamId,
            name: home.name,
            shortName: home.shortName,
            casualName: home.casualName,
            teamGameId: homeTeamGame.teamGameId,
          } as unknown as SQL<TeamBaseWithTeamGameId>,
          away: {
            teamId: away.teamId,
            name: away.name,
            shortName: away.shortName,
            casualName: away.casualName,
            teamGameId: awayTeamGame.teamGameId,
          } as unknown as SQL<TeamBaseWithTeamGameId>,
        })
        .from(games)
        .leftJoin(home, eq(home.teamId, games.homeTeamId))
        .leftJoin(away, eq(away.teamId, games.awayTeamId))
        .leftJoin(
          homeTeamGame,
          and(
            eq(home.teamId, homeTeamGame.teamId),
            eq(homeTeamGame.gameId, games.gameId),
          ),
        )
        .leftJoin(
          awayTeamGame,
          and(
            eq(away.teamId, awayTeamGame.teamId),
            eq(awayTeamGame.gameId, games.gameId),
          ),
        )
        .where(eq(games.gameId, gameId))
        .then((res) => res[0])

      return game
    } catch (error) {
      catchError(error)
    }
  })
