import { createFileRoute } from '@tanstack/react-router'
import TeamTable from '../-components/TeamTable'
import { getSingleTeamTables } from '../-functions/getSingleTeamTables'

export const Route = createFileRoute(
  '/_layout/teams/$teamId/tables/',
)({
  loader: async ({ params }) => {
    const tables = await getSingleTeamTables({
      data: params.teamId,
    })
    if (!tables) throw new Error('Något oväntat gick fel.')
    return tables
  },
  component: TeamTable,
})
