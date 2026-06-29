import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { and, eq, max, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

const maxScoreQuery = db.$with('max_score_query').as(
  db
    .select({
      teamId: teamgames.teamId,
      maxScore: max(teamgames.goalsScored).as('max_score'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        eq(teamgames.homeGame, false),
      ),
    )
    .groupBy(teamgames.teamId),
)

export const preparedMaxScoredAway = db
  .with(maxScoreQuery)
  .select({
    gameId: teamgames.gameId,
    date: teamgames.date,
    result: games.result,
    homeTeam: home.casualName,
    awayTeam: away.casualName,
  })
  .from(teamgames)
  .leftJoin(games, eq(games.gameId, teamgames.gameId))
  .leftJoin(home, eq(home.teamId, teamgames.opponentId))
  .leftJoin(away, eq(away.teamId, teamgames.teamId))
  .leftJoin(
    maxScoreQuery,
    eq(maxScoreQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, false),
      eq(teamgames.goalsScored, maxScoreQuery.maxScore),
    ),
  )
  .prepare('maxScoreAway')
