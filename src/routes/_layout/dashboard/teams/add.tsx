import { createFileRoute } from '@tanstack/react-router'
import AddTeam from '../-components/Forms/TeamForms/AddTeam'

export const Route = createFileRoute(
  '/_layout/dashboard/teams/add',
)({
  component: AddTeam,
})
