import { preparedMinTotalHome } from './preparedQueries/stats/preparedMinTotalHome'
import { preparedMinTotalAway } from './preparedQueries/stats/preparedMinTotalAway'
import { preparedMinGoalDifferenceHome } from './preparedQueries/stats/preparedMinGoalDifferenceHome'
import { preparedMinGoalDifferenceAway } from './preparedQueries/stats/preparedMinGoalDifferenceAway'
import { preparedMaxScoredHome } from './preparedQueries/stats/preparedMazScoredHome'
import { preparedMaxTotalHome } from './preparedQueries/stats/preparedMaxTotalHome'
import { preparedMaxTotalAway } from './preparedQueries/stats/preparedMaxTotalAway'
import { preparedMaxScoredAway } from './preparedQueries/stats/preparedMaxScoredAway'
import { preparedMaxGoalDifferenceHome } from './preparedQueries/stats/preparedMaxGoalDifferenceHome'
import { preparedMaxGoalDifferenceAway } from './preparedQueries/stats/preparedMaxGoalDifferenceAway'
import { preparedMaxConcededHome } from './preparedQueries/stats/preparedMaxConcededHome'
import { preparedMaxConcededAway } from './preparedQueries/stats/preparedMaxConcededAway'

export const getStats = async ({ teamId }: { teamId: number }) => {
  const maxScoredHomeGames = await preparedMaxScoredHome.execute({ teamId })

  const maxScoredAwayGames = await preparedMaxScoredAway.execute({ teamId })

  const maxGoalDifferenceHomeGames = await preparedMaxGoalDifferenceHome.execute({ teamId })

  const maxGoalDifferenceAwayGames = await preparedMaxGoalDifferenceAway.execute({ teamId })

  const minGoalDifferenceHomeGames = await preparedMinGoalDifferenceHome.execute({ teamId })

  const minGoalDifferenceAwayGames = await preparedMinGoalDifferenceAway.execute({ teamId })

  const maxConcededHomeGames = await preparedMaxConcededHome.execute({
    teamId,
  })

  const maxConcededAwayGames = await preparedMaxConcededAway.execute({
    teamId,
  })

  const maxTotalHomeGames = await preparedMaxTotalHome.execute({ teamId })

  const maxTotalAwayGames = await preparedMaxTotalAway.execute({ teamId })

  const minTotalHomeGames = await preparedMinTotalHome.execute({ teamId })

  const minTotalAwayGames = await preparedMinTotalAway.execute({ teamId })

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
