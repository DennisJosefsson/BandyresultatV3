import type { CompareCatTableRow } from '@/lib/types/compare'

export const filterOpposition = (
  array: Array<CompareCatTableRow>,
) => {
  const tempArray: Array<string> = []

  const callback = (item: CompareCatTableRow) => {
    if (
      tempArray.includes(
        item.team.casualName + item.opponent.casualName,
      )
    ) {
      return false
    } else {
      tempArray.push(
        item.opponent.casualName + item.team.casualName,
      )
      return true
    }
  }

  return array.filter(callback)
}
