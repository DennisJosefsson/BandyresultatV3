import EditParentSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/EditParentSerie'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/editParentId',
)({
  component: EditParentSerie,
})
