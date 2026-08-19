import AddCompetition from '@/routes/_layout/dashboard/-components/Forms/CompetitionForms/AddCompetition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/newCompetition',
)({
  component: AddCompetition,
})
