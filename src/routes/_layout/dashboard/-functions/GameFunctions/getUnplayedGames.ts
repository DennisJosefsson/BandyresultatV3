import { db } from '@/db'
import { games, series, teams } from '@/db/schema'
import { catchError } from '@/lib/middlewares/errors/catchError'
import { TeamBase } from '@/lib/types/team'
import { zd } from '@/lib/utils/zod'

import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { and, asc, desc, eq, getTableColumns, lte, SQL } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getUnplayedGames = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(zd.object({ today: zd.enum(['true','false']) })))
  .handler(async ({ data: { today } }) => {
    try {
      const currDate = new Date().toLocaleDateString('se-SV', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      const unplayedGames = await db
        .select({
          ...getTableColumns(games),
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
        .leftJoin(series, eq(games.serieId, series.serieId))
        .leftJoin(home, eq(games.homeTeamId, home.teamId))
        .leftJoin(away, eq(games.awayTeamId, away.teamId))
        .where(
          and(
            today === 'true' ? eq(games.date, currDate) : lte(games.date, currDate),
            eq(games.played, false),
          ),
        )
        .orderBy(asc(series.level), asc(games.women), desc(games.date))

      return unplayedGames
    } catch (error) {
      catchError(error)
    }
  })
