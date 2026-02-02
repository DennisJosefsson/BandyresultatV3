import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import NewSerie from '../../../-components/Forms/SerieForms/NewSerie'
import { getSeriesForSeriesForm } from '../../../-functions/SerieFunctions/getSeries'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/newSerie',
)({
  loader: async ({ params }) => {
    const series = await getSeriesForSeriesForm({
      data: { seasonId: params.seasonId },
    })
    if (!series) throw new Error('Missing data')

    return series
  },
  component: NewSerie,
  pendingComponent: () => <Loading page="default" />,
})
