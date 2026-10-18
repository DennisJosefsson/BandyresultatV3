import { createFileRoute } from '@tanstack/react-router'
import TeamSeasonAddition from '../../../-components/Season/TeamSeason/TeamSeasonAddition'
import { getTeamsForTeamseasonAddition } from '../../../-functions/SeasonFunctions/getTeamsForTeamseasonAddition'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/teamseason_/',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { seasonId },
    deps: { women },
  }) => {
    const data = await getTeamsForTeamseasonAddition({
      data: { seasonId, women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: TeamSeasonAddition,
})
