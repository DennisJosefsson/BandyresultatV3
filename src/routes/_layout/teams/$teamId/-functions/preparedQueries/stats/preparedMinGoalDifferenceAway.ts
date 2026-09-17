import { db } from '@/db'
import {
  games,
  teamgames,
  teamnames,
  teams,
} from '@/db/schema'
import { and, desc, eq, min, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamName = alias(teamnames, 'home_teamname')
const awayTeamName = alias(teamnames, 'away_teamname')

const minGoalDifferenceQuery = db
  .$with('min_goal_difference_query')
  .as(
    db
      .select({
        teamId: teamgames.teamId,
        minGoalDifference: min(teamgames.goalDifference).as(
          'min_goal_difference',
        ),
      })
      .from(teamgames)
      .where(
        and(
          eq(teamgames.teamId, sql.placeholder('teamId')),
          eq(teamgames.homeGame, false),
          eq(teamgames.played, true),
        ),
      )
      .groupBy(teamgames.teamId),
  )

export const preparedMinGoalDifferenceAway = db
  .with(minGoalDifferenceQuery)
  .select({
    gameId: teamgames.gameId,
    date: teamgames.date,
    result: games.result,
    homeTeam: homeTeamName.casualName,
    awayTeam: awayTeamName.casualName,
  })
  .from(teamgames)
  .leftJoin(games, eq(games.gameId, teamgames.gameId))
  .leftJoin(home, eq(home.teamId, teamgames.opponentId))
  .leftJoin(away, eq(away.teamId, teamgames.teamId))
  .leftJoin(
    homeTeamName,
    eq(homeTeamName.teamnameId, home.teamnameId),
  )
  .leftJoin(
    awayTeamName,
    eq(awayTeamName.teamnameId, away.teamnameId),
  )
  .leftJoin(
    minGoalDifferenceQuery,
    eq(minGoalDifferenceQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, false),
      eq(
        teamgames.goalDifference,
        minGoalDifferenceQuery.minGoalDifference,
      ),
      eq(teamgames.played, true),
    ),
  )
  .orderBy(desc(teamgames.date))
  .prepare('minGoalDifferenceAway')
