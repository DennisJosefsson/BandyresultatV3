import { createFileRoute } from '@tanstack/react-router'
import AddTeamName from '../-components/Forms/TeamForms/AddTeamName'

export const Route = createFileRoute(
  '/_layout/dashboard/teamnames/add',
)({
  component: AddTeamName,
})
