import type { teams } from '@/db/schema'

type GetCompareHeaderText = {
  homeTeam: typeof teams.$inferSelect
  awayTeam: typeof teams.$inferSelect
  gameCount: number
}

const getCompareHeaderText = ({
  homeTeam,
  awayTeam,
  gameCount,
}: GetCompareHeaderText): string => {
  const teamString = `${homeTeam.casualName} och ${awayTeam.casualName}`

  const matchup = `${homeTeam.name} - ${awayTeam.name}`

  let compareHeaderText = ''

  if (gameCount === 0) {
    compareHeaderText = `${teamString} har inga tidigare inbördes matcher i databasen.`
  } else {
    compareHeaderText = matchup
  }

  return compareHeaderText
}

export default getCompareHeaderText
