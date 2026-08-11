import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'

type SortedDates = {
  [key: string]: Array<Omit<Game, 'season'>>
}

export const sortGames = ({
  playedGamesArray,
  unplayedGamesArray,
  serie,
}: {
  playedGamesArray: Array<Omit<Game, 'season'>>
  unplayedGamesArray: Array<Omit<Game, 'season'>>
  serie: Serie
}) => {
  const playedGamesLength = playedGamesArray.length
  const unplayedGamesLength = unplayedGamesArray.length

  return {
    played: gameSortFunction({
      gamesArray: playedGamesArray,
      serie,
    }),
    unplayed: gameSortFunction({
      gamesArray: unplayedGamesArray,
      serie,
    }),
    unplayedLength: unplayedGamesLength,
    playedLength: playedGamesLength,
  }
}

const gameSortFunction = ({
  gamesArray,
  serie,
}: {
  gamesArray: Array<Omit<Game, 'season'>>
  serie: Serie
  played?: boolean
}) => {
  const sortDates = gamesArray.reduce((dates, game) => {
    if (!dates[game.date]) {
      dates[game.date] = []
    }
    dates[game.date].push(game)
    return dates
  }, {} as SortedDates)

  const sortedGameDates = Object.keys(sortDates).map(
    (date) => {
      return {
        date,
        games: sortDates[date],
      }
    },
  )

  return {
    group: serie.group,
    name: serie.serieName,
    comment: serie.comment,
    level: serie.level,
    dates: sortedGameDates,
  }
}
