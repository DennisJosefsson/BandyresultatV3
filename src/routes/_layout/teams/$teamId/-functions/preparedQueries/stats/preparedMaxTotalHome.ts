import { db } from '@/db'
import {
  games,
  teamgames,
  teamnames,
  teams,
} from '@/db/schema'
import { and, desc, eq, max, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')
const homeTeamName = alias(teamnames, 'home_teamname')
const awayTeamName = alias(teamnames, 'away_teamname')

const maxTotalQuery = db.$with('max_total_query').as(
  db
    .select({
      teamId: teamgames.teamId,
      maxTotal: max(teamgames.totalGoals).as('max_total'),
    })
    .from(teamgames)
    .where(
      and(
        eq(teamgames.teamId, sql.placeholder('teamId')),
        eq(teamgames.homeGame, true),
        eq(teamgames.played, true),
      ),
    )
    .groupBy(teamgames.teamId),
)

export const preparedMaxTotalHome = db
  .with(maxTotalQuery)
  .select({
    gameId: teamgames.gameId,
    date: teamgames.date,
    result: games.result,
    homeTeam: homeTeamName.casualName,
    awayTeam: awayTeamName.casualName,
  })
  .from(teamgames)
  .leftJoin(games, eq(games.gameId, teamgames.gameId))
  .leftJoin(home, eq(home.teamId, teamgames.teamId))
  .leftJoin(away, eq(away.teamId, teamgames.opponentId))
  .leftJoin(
    homeTeamName,
    eq(homeTeamName.teamnameId, home.teamnameId),
  )
  .leftJoin(
    awayTeamName,
    eq(awayTeamName.teamnameId, away.teamnameId),
  )
  .leftJoin(
    maxTotalQuery,
    eq(maxTotalQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, true),
      eq(teamgames.totalGoals, maxTotalQuery.maxTotal),
      eq(teamgames.played, true),
    ),
  )
  .orderBy(desc(teamgames.date))
  .prepare('maxTotalHome')
