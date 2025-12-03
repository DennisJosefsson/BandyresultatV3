import { seasons, teams } from '@/db/schema'

const catNames: Record<string, string> = {
  qualification: 'Kval',
  regular: 'Grundserie',
  eight: 'Åttondel',
  quarter: 'Kvartsfinal',
  semi: 'Semifinal',
  final: 'Final',
}

type GetCompareHeaderText = {
  seasonNames: (typeof seasons.$inferSelect)[]
  teams: (typeof teams.$inferSelect)[]
  categoryArray: string[]
  gameCount: number
}

const getCompareHeaderText = ({
  seasonNames,
  teams,
  categoryArray,
  gameCount,
}: GetCompareHeaderText): string => {
  const catStringArray = categoryArray.map((cat) => catNames[cat])

  let catString

  if (catStringArray.length === 1) {
    catString = 'i ' + catStringArray[0] + ','
  } else if (catStringArray.length === 6) {
    catString = ''
  } else {
    const last = catStringArray.pop()
    catString = 'i ' + catStringArray.join(', ') + ' och ' + last + ','
  }

  const teamStringArray = [...new Set(teams.map((team) => team.casualName))]

  const lastTeam = teamStringArray.pop()
  const teamString = teamStringArray.join(', ') + ' och ' + lastTeam

  const startSeasonName =
    seasonNames[0].seasonId < seasonNames[1].seasonId
      ? seasonNames[0].year
      : seasonNames[1].year
  const endSeasonName =
    seasonNames[0].seasonId > seasonNames[1].seasonId
      ? seasonNames[0].year
      : seasonNames[1].year

  let compareHeaderText = ''

  if (gameCount === 0 && seasonNames[0].seasonId === seasonNames[1].seasonId) {
    compareHeaderText = `${teamString} har inte mötts ${catString} säsongen ${seasonNames[0].year}.`
  } else if (gameCount === 0) {
    compareHeaderText = `${teamString} har inte mötts ${catString} mellan ${startSeasonName} och ${endSeasonName}.`
  } else {
    compareHeaderText = `Möten mellan ${teamString} ${catString} ${
      seasonNames[0].seasonId === seasonNames[1].seasonId
        ? `säsongen ${seasonNames[0].year}`
        : `${startSeasonName}-${endSeasonName}.`
    }`
  }

  return compareHeaderText
}

export default getCompareHeaderText
