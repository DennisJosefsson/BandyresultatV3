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
        eq(teamgames.played, true),
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
    minTotalQuery,
    eq(minTotalQuery.teamId, teamgames.teamId),
  )
  .where(
    and(
      eq(teamgames.teamId, sql.placeholder('teamId')),
      eq(teamgames.homeGame, true),
      eq(teamgames.totalGoals, minTotalQuery.minTotal),
      eq(teamgames.played, true),
    ),
  )
  .orderBy(desc(teamgames.date))
  .prepare('minTotalHome')
