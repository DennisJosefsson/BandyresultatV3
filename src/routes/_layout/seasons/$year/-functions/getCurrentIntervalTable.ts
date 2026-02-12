import { ReturnDevDataTableItem } from '@/lib/types/table'

type FunctionProps = {
  range: number[]
  tables: {
    date: string
    table: ReturnDevDataTableItem[]
  }[]
}

export const getCurrentIntervalTable = ({ range, tables }: FunctionProps) => {
  if (range.length !== 2) throw Error('Felaktig range data')

  const start = range[0]
  const end = range[1]

  if (end > tables.length) return

  const startDate = tables[start].date
  const endDate = tables[end].date

  if (start === 0) {
    return {
      startDate,
      endDate,
      table: tables[end].table,
    }
  }

  const startTable = tables[start - 1].table
  const endTable = tables[end].table

  const table = endTable
    .map((item) => {
      const startItem = startTable.find((start) => start.teamId === item.teamId)
      if (!startItem) {
        throw Error('Felaktig data')
      }

      return {
        ...item,

        position: item.position,
        totalGames: item.totalGames - startItem.totalGames,
        totalWins: item.totalWins - startItem.totalWins,
        totalDraws: item.totalDraws - startItem.totalDraws,
        totalLost: item.totalLost - startItem.totalLost,
        totalGoalsScored: item.totalGoalsScored - startItem.totalGoalsScored,
        totalGoalsConceded:
          item.totalGoalsConceded - startItem.totalGoalsConceded,
        totalGoalDifference:
          item.totalGoalDifference - startItem.totalGoalDifference,
        totalPoints: item.totalPoints - startItem.totalPoints,
      }
    })
    .sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (
          b.totalGoalsScored - b.totalGoalsConceded ===
          a.totalGoalsScored - a.totalGoalsConceded
        ) {
          return b.totalGoalsScored - a.totalGoalsScored
        }
        return b.totalGoalDifference - a.totalGoalDifference
      }
      return b.totalPoints - a.totalPoints
    })

  return {
    startDate,
    endDate,
    table,
  }
}
