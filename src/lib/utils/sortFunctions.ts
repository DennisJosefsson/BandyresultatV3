import { Game } from '../types/game'
import { Base, TeamTable } from '../types/table'
import { sortOrder } from './constants'

type SeriesData = {
  name: string
  group: string
  comment: string | null
  serieStructure: number[] | null
  level: number
}

type SortedTableGroups = Record<string, TeamTable[]>

export const tableSortFunction = (
  tableArray: TeamTable[],
  seriesData: SeriesData[],
) => {
  const groupArray = tableArray.reduce((groups, table) => {
    if (!groups[table.group]) {
      groups[table.group] = []
    }
    groups[table.group].push(table)
    return groups
  }, {} as SortedTableGroups)

  const sortedTables = Object.keys(groupArray).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group)
    return {
      group,
      name: seriesObject?.name ?? '',
      comment: seriesObject?.comment ?? '',
      serieStructure: seriesObject?.serieStructure ?? [],
      level: seriesObject?.level ?? 2,
      tables: groupArray[group],
    }
  })
  return sortedTables.sort((a, b) => {
    if (sortOrder.indexOf(a.group) > sortOrder.indexOf(b.group)) {
      return 1
    } else if (sortOrder.indexOf(a.group) < sortOrder.indexOf(b.group)) {
      return -1
    } else {
      return 0
    }
  })
}

const defaultTable = {
  teamId: 0,
  totalDraws: 0,
  totalGames: 0,
  totalGoalDifference: 0,
  totalGoalsConceded: 0,
  totalGoalsScored: 0,
  totalLost: 0,
  totalPoints: 0,
  totalWins: 0,
}

export const leagueTableParser = (
  teamArray: Base[],
  tabell: TeamTable[],
): TeamTable[] => {
  teamArray.forEach((teamItem) => {
    const tableItemExist = tabell.find(
      (table) =>
        table.teamId === teamItem.teamId && table.group === teamItem.group,
    )
    if (!tableItemExist) {
      const teamTable: TeamTable = {
        ...teamItem,
        ...defaultTable,
      }
      tabell.push(teamTable)
    } else {
      return
    }
  })

  return tabell
}

type SortedGameGroups = {
  [key: string]: Game[]
}

type SortedDates = {
  [key: string]: Game[]
}

export function gameSortFunction(
  gamesArray: Game[],
  seriesData: SeriesData[],
  played = false,
) {
  const sortGroups = gamesArray.reduce((groups, game) => {
    if (!groups[game.group]) {
      groups[game.group] = []
    }
    groups[game.group].push(game)
    return groups
  }, {} as SortedGameGroups)

  const sortedGames = Object.keys(sortGroups).map((group) => {
    const seriesObject = seriesData.find((serie) => serie.group === group)

    return {
      group,
      name: seriesObject?.name ?? '',
      comment: seriesObject?.comment ?? '',
      level: seriesObject?.level ?? 2,
      games: sortGroups[group],
    }
  })

  const sortGroupsAndDates = sortedGames.map((groupObject) => {
    const sortDates = groupObject.games.reduce((dates, game) => {
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
      group: groupObject['group'],
      name: groupObject['name'],
      comment: groupObject['comment'],
      level: groupObject['level'],
      dates: played ? sortedGameDates.reverse() : sortedGameDates,
    }
  })

  return sortGroupsAndDates.sort((a, b) => a.level - b.level)
}
