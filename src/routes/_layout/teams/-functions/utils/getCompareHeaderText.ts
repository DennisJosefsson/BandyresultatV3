import type { teams } from '@/db/schema'
import type { TeamBaseWithLogo } from '@/lib/types/team'

type GetCompareHeaderText = {
  homeTeam: typeof teams.$inferSelect & {
    team: TeamBaseWithLogo
  }
  awayTeam: typeof teams.$inferSelect & {
    team: TeamBaseWithLogo
  }
  gameCount: number
}

const getCompareHeaderText = ({
  homeTeam,
  awayTeam,
  gameCount,
}: GetCompareHeaderText): string => {
  const teamString = `${homeTeam.team.casualName} och ${awayTeam.team.casualName}`

  const matchup = `${homeTeam.team.name} - ${awayTeam.team.name}`

  let compareHeaderText = ''

  if (gameCount === 0) {
    compareHeaderText = `${teamString} har inga tidigare inbördes matcher i databasen.`
  } else {
    compareHeaderText = matchup
  }

  return compareHeaderText
}

export default getCompareHeaderText
