import { Game } from '@/lib/types/game'
import { Serie } from '@/lib/types/serie'

type SortedDates = {
  [key: string]: Omit<Game, 'season'>[]
}

export const sortGames = ({
  gamesArray,
  serie,
}: {
  gamesArray: Omit<Game, 'season'>[]
  serie: Serie
}) => {
  const playedGames = gamesArray.filter((game) => game.played === true)
  const unplayedGames = gamesArray.filter((game) => !game.played)
  const unplayedGamesLength = unplayedGames.length
  const playedGamesLength = playedGames.length

  return {
    played: gameSortFunction({ gamesArray: playedGames, serie, played: true }),
    unplayed: gameSortFunction({ gamesArray: unplayedGames, serie }),
    unplayedLength: unplayedGamesLength,
    playedLength: playedGamesLength,
  }
}

const gameSortFunction = ({
  gamesArray,
  serie,
  played = false,
}: {
  gamesArray: Omit<Game, 'season'>[]
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

  const sortedGameDates = Object.keys(sortDates).map((date) => {
    return {
      date,
      games: sortDates[date],
    }
  })

  return {
    group: serie.group,
    name: serie.serieName,
    comment: serie.comment,
    level: serie.level,
    dates: played ? sortedGameDates.reverse() : sortedGameDates,
  }
}
