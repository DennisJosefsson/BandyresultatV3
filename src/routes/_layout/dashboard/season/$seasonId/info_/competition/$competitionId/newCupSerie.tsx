import Loading from '@/components/Loading/Loading'
import NewCupSerie from '@/routes/_layout/dashboard/-components/Forms/SerieForms/NewCupSerie'
import { getSeriesForSeriesForm } from '@/routes/_layout/dashboard/-functions/SerieFunctions/getSeries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/competition/$competitionId/newCupSerie',
)({
  loader: async ({ params }) => {
    const series = await getSeriesForSeriesForm({
      data: {
        seasonId: params.seasonId,
        competitionId: params.competitionId,
      },
    })
    if (!series) throw new Error('Missing data')

    return series
  },
  component: NewCupSerie,
  pendingComponent: () => <Loading page="default" />,
})
