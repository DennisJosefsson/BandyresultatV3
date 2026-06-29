import { createFileRoute } from '@tanstack/react-router'
import TeamCuriosities from '../-components/TeamCuriosities'
import { getSingleTeamStats } from '../-functions/getSingleTeamStats'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/stats/',
)({
  loader: async ({ params }) => {
    const stats = await getSingleTeamStats({
      data: params.teamId,
    })
    if (!stats) throw new Error('Något oväntat gick fel.')
    return stats
  },
  component: TeamCuriosities,
})
