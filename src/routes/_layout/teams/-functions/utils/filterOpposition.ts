import { CompareCatTable, CompareCatTableItem } from './compareQueries'

export const filterOpposition = (array: CompareCatTable) => {
  const tempArray: string[] = []

  const callback = (item: CompareCatTableItem) => {
    if (tempArray.includes(item.team.casualName + item.opponent.casualName)) {
      return false
    } else {
      tempArray.push(item.opponent.casualName + item.team.casualName)
      return true
    }
  }

  return array.filter(callback)
}
