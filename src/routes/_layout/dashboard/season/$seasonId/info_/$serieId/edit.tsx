import Loading from '@/components/Loading/Loading'
import EditSerieForms from '@/routes/_layout/dashboard/-components/Forms/SerieForms/EditSerieForms'
import { getSerieForEdit } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSerieForEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit',
)({
  loader: async ({ params }) => {
    const data = await getSerieForEdit({
      data: { seasonId: params.seasonId, serieId: params.serieId },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: EditSerieForms,
  pendingComponent: () => <Loading page="default" />,
})
