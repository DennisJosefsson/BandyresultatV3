import { createFileRoute } from '@tanstack/react-router'
import Loading from '@/components/Loading/Loading'
import { getSeriesForSeriesForm } from '../../../-functions/SerieFunctions/getSeries'
import NewSerie from '../../../-components/Forms/SerieForms/NewSerie'

export const Route = createFileRoute('/_layout/dashboard/season/$seasonId/info_/newSerie')({
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
