import { createFileRoute } from '@tanstack/react-router'
import { getSingleTeamFiveTables } from '../-functions/getSingleTeamFiveTables'
import TeamFiveSeasonsTables from '../-components/TeamFiveSeasons'

export const Route = createFileRoute('/_layout/teams/$teamId/latest/')({
  loader: async ({ params }) => {
    const fiveSeasons = await getSingleTeamFiveTables({
      data: params.teamId,
    })
    if (!fiveSeasons) throw new Error('Något oväntat gick fel.')
    return fiveSeasons
  },
  staticData: { breadcrumb: '5 senaste säsongerna' },
  component: TeamFiveSeasonsTables,
})
