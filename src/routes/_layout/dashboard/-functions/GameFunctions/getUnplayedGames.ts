import { db } from '@/db'
import {
  games,
  series,
  teamgames,
  teamnames,
  teams,
} from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import type { TeamBaseWithTeamGameId } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'
import { createServerFn } from '@tanstack/react-start'
import type { SQL } from 'drizzle-orm'
import {
  and,
  asc,
  desc,
  eq,
  getTableColumns,
  lte,
} from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamName = alias(teamnames, 'home_teamname')
const awayTeamName = alias(teamnames, 'away_teamname')
const homeTeamGame = alias(teamgames, 'home_teamgame')
const awayTeamGame = alias(teamgames, 'away_teamgame')

export const getUnplayedGames = createServerFn({
  method: 'GET',
})
  .validator(
    zd.object({ today: zd.enum(['true', 'false']) }),
  )
  .handler(async ({ data: { today } }) => {
    try {
      const currDate = new Date().toLocaleDateString(
        'se-SV',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        },
      )

      const unplayedGames = await db
        .select({
          ...getTableColumns(games),
          home: {
            teamId: games.homeTeamId,
            name: homeTeamName.name,
            shortName: homeTeamName.shortName,
            casualName: homeTeamName.casualName,
            teamGameId: homeTeamGame.teamGameId,
          } as unknown as SQL<TeamBaseWithTeamGameId>,
          away: {
            teamId: away.teamId,
            name: awayTeamName.name,
            shortName: awayTeamName.shortName,
            casualName: awayTeamName.casualName,
            teamGameId: awayTeamGame.teamGameId,
          } as unknown as SQL<TeamBaseWithTeamGameId>,
        })
        .from(games)
        .leftJoin(series, eq(games.serieId, series.serieId))
        .leftJoin(
          homeTeamName,
          eq(homeTeamName.teamnameId, home.teamnameId),
        )
        .leftJoin(away, eq(away.teamId, games.awayTeamId))
        .leftJoin(
          awayTeamName,
          eq(awayTeamName.teamnameId, away.teamnameId),
        )
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
        .where(
          and(
            today === 'true'
              ? eq(games.date, currDate)
              : lte(games.date, currDate),
            eq(games.played, false),
          ),
        )
        .orderBy(
          asc(series.level),
          asc(games.women),
          desc(games.date),
        )

      return unplayedGames
    } catch (error) {
      catchError(error)
    }
  })
