import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { and, eq, min, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

const minTotalQuery = db.$with('min_total_query').as(
  db
    .select({
      teamId: teamgames.teamId,
      minTotal: min(teamgames.totalGoals).as('min_total'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        eq(teamgames.homeGame, true),
      ),
    )
    .groupBy(teamgames.teamId),
)

export const preparedMinTotalHome = db
  .with(minTotalQuery)
  .select({
    gameId: teamgames.gameId,
    date: teamgames.date,
    result: games.result,
    homeTeam: home.casualName,
    awayTeam: away.casualName,
  })
  .from(teamgames)
  .leftJoin(games, eq(games.gameId, teamgames.gameId))
  .leftJoin(home, eq(home.teamId, teamgames.teamId))
  .leftJoin(away, eq(away.teamId, teamgames.opponentId))
  .leftJoin(
    minTotalQuery,
    eq(minTotalQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, true),
      eq(teamgames.totalGoals, minTotalQuery.minTotal),
    ),
  )
  .prepare('minTotalHome')
