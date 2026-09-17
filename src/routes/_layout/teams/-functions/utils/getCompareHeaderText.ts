import type { teamlogos, teams } from '@/db/schema'
import type { TeamName } from '@/lib/types/team'

type GetCompareHeaderText = {
  homeTeam: typeof teams.$inferSelect & {
    teamname: TeamName & {
      logo: typeof teamlogos.$inferSelect | null
    }
  }
  awayTeam: typeof teams.$inferSelect & {
    teamname: TeamName & {
      logo: typeof teamlogos.$inferSelect | null
    }
  }
  gameCount: number
}

const getCompareHeaderText = ({
  homeTeam,
  awayTeam,
  gameCount,
}: GetCompareHeaderText): string => {
  const teamString = `${homeTeam.teamname.casualName} och ${awayTeam.teamname.casualName}`

  const matchup = `${homeTeam.teamname.name} - ${awayTeam.teamname.name}`

  let compareHeaderText = ''

  if (gameCount === 0) {
    compareHeaderText = `${teamString} har inga tidigare inbördes matcher i databasen.`
  } else {
    compareHeaderText = matchup
  }

  return compareHeaderText
}

export default getCompareHeaderText
