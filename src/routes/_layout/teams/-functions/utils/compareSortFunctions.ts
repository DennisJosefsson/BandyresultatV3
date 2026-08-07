import type {
  CompareBaseTable,
  CompareCatTableRow,
} from '@/lib/types/compare'
import {
  getCategoryName,
  getDivisionName,
} from './nameUtils'

type SortedCompareCategoryTables = {
  [key: string]: Array<CompareCatTableRow>
}

type SortedTables = {
  [key: string]: Array<CompareBaseTable>
}

export const compareSortDivisionFunction = (
  gamesArray: Array<CompareCatTableRow>,
) => {
  const sortDivisions = gamesArray.reduce(
    (divisions, table) => {
      if (!divisions[table.serie.division]) {
        divisions[table.serie.division] = []
      }
      divisions[table.serie.division].push(table)
      return divisions
    },
    {} as SortedCompareCategoryTables,
  )

  const sortedDivisions = Object.keys(sortDivisions).map(
    (division) => {
      return {
        division,
        categories: sortDivisions[division],
      }
    },
  )

  const sortDivisionsAndTables = sortedDivisions.map(
    (divisionObject) => {
      const sortCats = divisionObject.categories.reduce(
        (category, table) => {
          if (!category[table.category]) {
            category[table.category] = []
          }
          category[table.category].push(table)
          return category
        },
        {} as SortedTables,
      )

      const sortedTables = Object.keys(sortCats).map(
        (cat) => {
          return {
            category: cat,
            categoryName: getCategoryName(cat),
            tables: sortCats[cat],
          }
        },
      )
      return {
        division: divisionObject['division'],
        divisionName: getDivisionName(
          divisionObject['division'],
        ),
        tables: sortedTables,
      }
    },
  )

  return sortDivisionsAndTables.sort(
    (a, b) => parseInt(a.division) - parseInt(b.division),
  )
}

// export const compareAllTeamData = (allDataArray: Array<CompareAllTableRow>) => {
//   const newArray: Array<CompareBaseTable> = []

//   allDataArray.forEach((team) => {
//     if (!newArray.find((teamItem) => team.teamId === teamItem.teamId)) {
//       newArray.push({
//         teamId: team.teamId,
//         team: {
//           casualName: team.team.casualName,
//           name: team.team.name,
//           teamId: team.team.teamId,
//           shortName: team.team.shortName,
//         },
//         totalGames: 0,
//         totalWins: 0,
//         totalDraws: 0,
//         totalLost: 0,
//         totalGoalDifference: 0,
//         totalGoalsScored: 0,
//         totalGoalsConceded: 0,
//         totalPoints: 0,
//       })
//     }
//     const teamIndex = newArray.findIndex((teamItem) => team.teamId === teamItem.teamId)
//     newArray[teamIndex].totalGames += team.totalGames
//     newArray[teamIndex].totalWins += team.totalWins
//     newArray[teamIndex].totalDraws += team.totalDraws
//     newArray[teamIndex].totalLost += team.totalLost
//     newArray[teamIndex].totalGoalsScored += team.totalGoalsScored
//     newArray[teamIndex].totalGoalsConceded += team.totalGoalsConceded
//     newArray[teamIndex].totalGoalDifference += team.totalGoalDifference
//     newArray[teamIndex].totalPoints += team.totalPoints
//   })

//   return newArray.sort((a, b) => {
//     if (a.totalPoints < b.totalPoints) {
//       return 1
//     } else if (a.totalPoints > b.totalPoints) {
//       return -1
//     } else {
//       return 0
//     }
//   })
// }
