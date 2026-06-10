import { createFileRoute } from '@tanstack/react-router'
import { getTeamsForTeamseasonAddition } from '../../../-functions/SeasonFunctions/getTeamsForTeamseasonAddition'
import TeamSeasonAddition from '../../../-components/Season/TeamSeason/TeamSeasonAddition'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/teamseason_/')({
  loader: async ({ params }) => {
    const data = await getTeamsForTeamseasonAddition({
      data: { seasonId: params.seasonId },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: TeamSeasonAddition,
})
