import { createFileRoute } from '@tanstack/react-router'

import AddParentSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/AddParentSerie'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/newParentId',
)({
  component: AddParentSerie,
})
