import { teams } from '@/db/schema'

type GetCompareHeaderText = {
  teams: (typeof teams.$inferSelect)[]
  gameCount: number
}

const getCompareHeaderText = ({
  teams,
  gameCount,
}: GetCompareHeaderText): string => {
  const teamStringArray = [...new Set(teams.map((team) => team.casualName))]

  const lastTeam = teamStringArray.pop()
  const teamString = teamStringArray.join(', ') + ' och ' + lastTeam

  let compareHeaderText = ''

  if (gameCount === 0) {
    compareHeaderText = `${teamString} har inga tidigare inbördes matcher i databasen.`
  } else {
    compareHeaderText = `Möten mellan ${teamString}`
  }

  return compareHeaderText
}

export default getCompareHeaderText
