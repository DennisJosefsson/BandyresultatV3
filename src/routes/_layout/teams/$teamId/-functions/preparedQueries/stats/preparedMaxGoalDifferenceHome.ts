import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { and, eq, max, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

const maxGoalDifferenceQuery = db
  .$with('max_goal_difference_query')
  .as(
    db
      .select({
        teamId: teamgames.teamId,
        maxGoalDifference: max(teamgames.goalDifference).as(
          'max_goal_difference',
        ),
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

export const preparedMaxGoalDifferenceHome = db
  .with(maxGoalDifferenceQuery)
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
    maxGoalDifferenceQuery,
    eq(maxGoalDifferenceQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, true),
      eq(
        teamgames.goalDifference,
        maxGoalDifferenceQuery.maxGoalDifference,
      ),
    ),
  )
  .prepare('maxGoalDifferenceHome')
