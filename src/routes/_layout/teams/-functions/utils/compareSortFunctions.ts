import {
  AllGamesTable,
  AllGamesTableItem,
  CompareCatTable,
} from './compareQueries'

type SortedCompareCategoryTables = {
  [key: string]: CompareCatTable
}

type SortedTables = {
  [key: string]: CompareCatTable
}

type LevelName = {
  [key: string]: string
}

const levelName: LevelName = {
  '1': 'Högsta divisionen',
  '2': 'Näst högsta divisionen',
  '3': 'Tredje divisionen',
  '4': 'Fjärde divisionen',
  '5': 'Femte divisionen',
}

export const compareSortLevelFunction = (gamesArray: CompareCatTable) => {
  const sortLevels = gamesArray.reduce((levels, table) => {
    if (!levels[table.serie.level]) {
      levels[table.serie.level] = []
    }
    levels[table.serie.level].push(table)
    return levels
  }, {} as SortedCompareCategoryTables)

  const sortedLevels = Object.keys(sortLevels).map((level) => {
    return {
      level,
      categories: sortLevels[level],
    }
  })

  const sortLevelsAndTables = sortedLevels.map((levelObject) => {
    const sortCats = levelObject.categories.reduce((category, table) => {
      if (!category[table.category]) {
        category[table.category] = []
      }
      category[table.category].push(table)
      return category
    }, {} as SortedTables)

    const sortedTables = Object.keys(sortCats).map((cat) => {
      return {
        category: cat,
        tables: sortCats[cat],
      }
    })
    return {
      level: levelObject['level'],
      levelName: levelName[levelObject['level']],
      tables: sortedTables,
    }
  })

  return sortLevelsAndTables.sort(
    (a, b) => parseInt(a.level) - parseInt(b.level),
  )
}

export const compareAllTeamData = (allDataArray: AllGamesTable) => {
  const newArray: Omit<AllGamesTableItem, 'opponentId' | 'opponent'>[] = []

  allDataArray.forEach((team) => {
    if (!newArray.find((teamItem) => team.teamId === teamItem.teamId)) {
      newArray.push({
        teamId: team.teamId,
        team: {
          casualName: team.team.casualName,
          name: team.team.name,
          teamId: team.team.teamId,
          shortName: team.team.shortName,
        },
        totalGames: 0,
        totalWins: 0,
        totalDraws: 0,
        totalLost: 0,
        totalGoalDifference: 0,
        totalGoalsScored: 0,
        totalGoalsConceded: 0,
        totalPoints: 0,
      })
    }
    const teamIndex = newArray.findIndex(
      (teamItem) => team.teamId === teamItem.teamId,
    )
    newArray[teamIndex].totalGames += team.totalGames
    newArray[teamIndex].totalWins += team.totalWins
    newArray[teamIndex].totalDraws += team.totalDraws
    newArray[teamIndex].totalLost += team.totalLost
    newArray[teamIndex].totalGoalsScored += team.totalGoalsScored
    newArray[teamIndex].totalGoalsConceded += team.totalGoalsConceded
    newArray[teamIndex].totalGoalDifference += team.totalGoalDifference
    newArray[teamIndex].totalPoints += team.totalPoints
  })

  return newArray.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) {
      return 1
    } else if (a.totalPoints > b.totalPoints) {
      return -1
    } else {
      return 0
    }
  })
}
