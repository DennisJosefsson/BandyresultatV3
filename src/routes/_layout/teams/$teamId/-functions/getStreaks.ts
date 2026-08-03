import { preparedWinStreaks } from './preparedQueries/streaks/preparedWinStreaks'
import { preparedUnbeatenStreaks } from './preparedQueries/streaks/preparedUnbeatenStreak'
import { preparedPlayoffStreaks } from './preparedQueries/streaks/preparedPlayoffStreaks'
import { preparedNoWinStreaks } from './preparedQueries/streaks/preparedNoWinStreak'
import { preparedLosingStreak } from './preparedQueries/streaks/preparedLosingStreak'
import { preparedDrawStreaks } from './preparedQueries/streaks/preparedDrawStreak'

export const getStreaks = async ({ teamId }: { teamId: number }) => {
  const losingStreak = await preparedLosingStreak.execute({
    teamId,
  })

  const drawStreak = await preparedDrawStreaks.execute({
    teamId,
  })

  const winStreak = await preparedWinStreaks.execute({
    teamId,
  })

  const noWinStreak = await preparedNoWinStreaks.execute({
    teamId,
  })

  const unbeatenStreak = await preparedUnbeatenStreaks.execute({
    teamId,
  })

  const playoffStreak = await preparedPlayoffStreaks.execute({ teamId })

  const streakObjectsLength =
    losingStreak.length +
    noWinStreak.length +
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length
  return {
    losingStreak,
    drawStreak,
    winStreak,
    noWinStreak,
    unbeatenStreak,
    streakObjectsLength,
    playoffStreak,
  }
}
