import { createFileRoute } from '@tanstack/react-router'

import EditParentSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/EditParentSerie'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/editParentId',
)({
  component: EditParentSerie,
})
