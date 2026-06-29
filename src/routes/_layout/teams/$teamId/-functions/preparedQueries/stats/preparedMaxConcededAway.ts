import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { and, eq, max, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

const maxConcededQuery = db.$with('max_conceded_query').as(
  db
    .select({
      teamId: teamgames.teamId,
      maxConceded: max(teamgames.goalsConceded).as(
        'max_conceded',
      ),
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

export const preparedMaxConcededAway = db
  .with(maxConcededQuery)
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
    maxConcededQuery,
    eq(maxConcededQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, false),
      eq(
        teamgames.goalsConceded,
        maxConcededQuery.maxConceded,
      ),
    ),
  )
  .prepare('maxConcededAway')
