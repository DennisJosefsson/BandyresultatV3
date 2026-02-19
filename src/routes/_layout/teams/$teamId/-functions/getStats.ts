import { db } from '@/db'
import { games, teamgames, teams } from '@/db/schema'
import { and, eq, max, min } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

const home = alias(teams, 'home')
const away = alias(teams, 'away')

export const getStats = async ({ teamId }: { teamId: number }) => {
  const maxScoredHomeGames = await maxScoredHome({ teamId })
  const maxScoredAwayGames = await maxScoredAway({ teamId })
  const maxGoalDifferenceHomeGames = await maxGoalDifferenceHome({ teamId })
  const maxGoalDifferenceAwayGames = await maxGoalDifferenceAway({ teamId })
  const minGoalDifferenceHomeGames = await minGoalDifferenceHome({ teamId })
  const minGoalDifferenceAwayGames = await minGoalDifferenceAway({ teamId })
  const maxConcededHomeGames = await maxConcededHome({ teamId })
  const maxConcededAwayGames = await maxConcededAway({ teamId })
  const maxTotalHomeGames = await maxTotalHome({ teamId })
  const maxTotalAwayGames = await maxTotalAway({ teamId })
  const minTotalHomeGames = await minTotalHome({ teamId })
  const minTotalAwayGames = await minTotalAway({ teamId })

  return {
    maxScoredHomeGames,
    maxScoredAwayGames,
    maxGoalDifferenceHomeGames,
    maxGoalDifferenceAwayGames,
    minGoalDifferenceHomeGames,
    minGoalDifferenceAwayGames,
    maxConcededHomeGames,
    maxConcededAwayGames,
    maxTotalHomeGames,
    maxTotalAwayGames,
    minTotalHomeGames,
    minTotalAwayGames,
  }
}

const maxScoredHome = async ({ teamId }: { teamId: number }) => {
  const maxScoreQuery = db.$with('max_score_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxScore: max(teamgames.goalsScored).as('max_score'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(home, eq(home.teamId, teamgames.teamId))
    .leftJoin(away, eq(away.teamId, teamgames.opponentId))
    .leftJoin(maxScoreQuery, eq(maxScoreQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.goalsScored, maxScoreQuery.maxScore),
      ),
    )

  return getGames
}

const maxScoredAway = async ({ teamId }: { teamId: number }) => {
  const maxScoreQuery = db.$with('max_score_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxScore: max(teamgames.goalsScored).as('max_score'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(maxScoreQuery, eq(maxScoreQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.goalsScored, maxScoreQuery.maxScore),
      ),
    )

  return getGames
}

// const minScoredHome = async ({ teamId }: { teamId: number }) => {
//   const minScoreQuery = db.$with('min_score_query').as(
//     db
//       .select({
//         teamId: teamgames.teamId,
//         minScore: min(teamgames.goalsScored).as('min_score'),
//       })
//       .from(teamgames)
//       .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
//       .groupBy(teamgames.teamId),
//   )

//   const getGames = await db
//     .with(minScoreQuery)
//     .select({
//       gameId: teamgames.gameId,
//       date: teamgames.date,
//       result: games.result,
//       homeTeam: home.casualName,
//       awayTeam: away.casualName,
//     })
//     .from(teamgames)
//     .leftJoin(games, eq(games.gameId, teamgames.gameId))
//     .leftJoin(home, eq(home.teamId, teamgames.teamId))
//     .leftJoin(away, eq(away.teamId, teamgames.opponentId))
//     .leftJoin(minScoreQuery, eq(minScoreQuery.teamId, teamgames.teamId))
//     .where(
//       and(
//         eq(teamgames.teamId, teamId),
//         eq(teamgames.homeGame, true),
//         eq(teamgames.goalsScored, minScoreQuery.minScore),
//       ),
//     )

//   return getGames
// }

// const minScoredAway = async ({ teamId }: { teamId: number }) => {
//   const minScoreQuery = db.$with('min_score_query').as(
//     db
//       .select({
//         teamId: teamgames.teamId,
//         minScore: min(teamgames.goalsScored).as('min_score'),
//       })
//       .from(teamgames)
//       .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
//       .groupBy(teamgames.teamId),
//   )

//   const getGames = await db
//     .with(minScoreQuery)
//     .select({
//       gameId: teamgames.gameId,
//       date: teamgames.date,
//       result: games.result,
//       homeTeam: home.casualName,
//       awayTeam: away.casualName,
//     })
//     .from(teamgames)
//     .leftJoin(games, eq(games.gameId, teamgames.gameId))
//     .leftJoin(home, eq(home.teamId, teamgames.opponentId))
//     .leftJoin(away, eq(away.teamId, teamgames.teamId))
//     .leftJoin(minScoreQuery, eq(minScoreQuery.teamId, teamgames.teamId))
//     .where(
//       and(
//         eq(teamgames.teamId, teamId),
//         eq(teamgames.homeGame, false),
//         eq(teamgames.goalsScored, minScoreQuery.minScore),
//       ),
//     )

//   return getGames
// }

const maxGoalDifferenceHome = async ({ teamId }: { teamId: number }) => {
  const maxGoalDifferenceQuery = db.$with('max_goal_difference_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxGoalDifference: max(teamgames.goalDifference).as(
          'max_goal_difference',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.goalDifference, maxGoalDifferenceQuery.maxGoalDifference),
      ),
    )

  return getGames
}

const maxGoalDifferenceAway = async ({ teamId }: { teamId: number }) => {
  const maxGoalDifferenceQuery = db.$with('max_goal_difference_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxGoalDifference: max(teamgames.goalDifference).as(
          'max_goal_difference',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(home, eq(home.teamId, teamgames.opponentId))
    .leftJoin(away, eq(away.teamId, teamgames.teamId))
    .leftJoin(
      maxGoalDifferenceQuery,
      eq(maxGoalDifferenceQuery.teamId, teamgames.teamId),
    )
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.goalDifference, maxGoalDifferenceQuery.maxGoalDifference),
      ),
    )

  return getGames
}

const minGoalDifferenceHome = async ({ teamId }: { teamId: number }) => {
  const minGoalDifferenceQuery = db.$with('min_goal_difference_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        minGoalDifference: min(teamgames.goalDifference).as(
          'min_goal_difference',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
    .with(minGoalDifferenceQuery)
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
      minGoalDifferenceQuery,
      eq(minGoalDifferenceQuery.teamId, teamgames.teamId),
    )
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.goalDifference, minGoalDifferenceQuery.minGoalDifference),
      ),
    )

  return getGames
}

const minGoalDifferenceAway = async ({ teamId }: { teamId: number }) => {
  const minGoalDifferenceQuery = db.$with('min_goal_difference_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        minGoalDifference: min(teamgames.goalDifference).as(
          'min_goal_difference',
        ),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
    .with(minGoalDifferenceQuery)
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
      minGoalDifferenceQuery,
      eq(minGoalDifferenceQuery.teamId, teamgames.teamId),
    )
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.goalDifference, minGoalDifferenceQuery.minGoalDifference),
      ),
    )

  return getGames
}

const maxConcededHome = async ({ teamId }: { teamId: number }) => {
  const maxConcededQuery = db.$with('max_conceded_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxConceded: max(teamgames.goalsConceded).as('max_conceded'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(home, eq(home.teamId, teamgames.teamId))
    .leftJoin(away, eq(away.teamId, teamgames.opponentId))
    .leftJoin(maxConcededQuery, eq(maxConcededQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.goalsConceded, maxConcededQuery.maxConceded),
      ),
    )

  return getGames
}

const maxConcededAway = async ({ teamId }: { teamId: number }) => {
  const maxConcededQuery = db.$with('max_conceded_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxConceded: max(teamgames.goalsConceded).as('max_conceded'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(maxConcededQuery, eq(maxConcededQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.goalsConceded, maxConcededQuery.maxConceded),
      ),
    )

  return getGames
}

const maxTotalHome = async ({ teamId }: { teamId: number }) => {
  const maxTotalQuery = db.$with('max_total_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxTotal: max(teamgames.totalGoals).as('max_total'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
    .with(maxTotalQuery)
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
    .leftJoin(maxTotalQuery, eq(maxTotalQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.totalGoals, maxTotalQuery.maxTotal),
      ),
    )

  return getGames
}

const maxTotalAway = async ({ teamId }: { teamId: number }) => {
  const maxTotalQuery = db.$with('max_total_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        maxTotal: max(teamgames.totalGoals).as('max_total'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
    .with(maxTotalQuery)
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
    .leftJoin(maxTotalQuery, eq(maxTotalQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.totalGoals, maxTotalQuery.maxTotal),
      ),
    )

  return getGames
}

const minTotalHome = async ({ teamId }: { teamId: number }) => {
  const minTotalQuery = db.$with('min_total_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        minTotal: min(teamgames.totalGoals).as('min_total'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, true)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(minTotalQuery, eq(minTotalQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, true),
        eq(teamgames.totalGoals, minTotalQuery.minTotal),
      ),
    )

  return getGames
}

const minTotalAway = async ({ teamId }: { teamId: number }) => {
  const minTotalQuery = db.$with('min_total_query').as(
    db
      .select({
        teamId: teamgames.teamId,
        minTotal: min(teamgames.totalGoals).as('min_total'),
      })
      .from(teamgames)
      .where(and(eq(teamgames.teamId, teamId), eq(teamgames.homeGame, false)))
      .groupBy(teamgames.teamId),
  )

  const getGames = await db
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
    .leftJoin(home, eq(home.teamId, teamgames.opponentId))
    .leftJoin(away, eq(away.teamId, teamgames.teamId))
    .leftJoin(minTotalQuery, eq(minTotalQuery.teamId, teamgames.teamId))
    .where(
      and(
        eq(teamgames.teamId, teamId),
        eq(teamgames.homeGame, false),
        eq(teamgames.totalGoals, minTotalQuery.minTotal),
      ),
    )

  return getGames
}
