import AddParentSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/AddParentSerie'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/newParentId',
)({
  component: AddParentSerie,
})
