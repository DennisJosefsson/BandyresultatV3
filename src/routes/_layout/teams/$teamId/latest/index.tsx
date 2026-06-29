import { createFileRoute } from '@tanstack/react-router'
import TeamFiveSeasonsTables from '../-components/TeamFiveSeasons'
import { getSingleTeamFiveTables } from '../-functions/getSingleTeamFiveTables'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/latest/',
)({
  loader: async ({ params }) => {
    const fiveSeasons = await getSingleTeamFiveTables({
      data: params.teamId,
    })
    if (!fiveSeasons)
      throw new Error('Något oväntat gick fel.')
    return fiveSeasons
  },
  component: TeamFiveSeasonsTables,
})
