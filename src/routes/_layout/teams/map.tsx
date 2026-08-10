import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import Map from './-components/Map/Map'
import { getMapTeams } from './-functions/getMapTeams'

export const Route = createFileRoute('/_layout/teams/map')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  component: MapComponent,
  loader: async ({ deps }) => {
    const data = await getMapTeams({ data: deps.women })
    if (!data) throw new Error('Missing mapTeams data')
    return data
  },
  pendingComponent: () => <Loading page="seasonMap" />,
  staticData: { breadcrumb: 'Karta' },
})

function MapComponent() {
  return (
    <CustomCatchBoundary id="seasonsMap">
      <Map />
    </CustomCatchBoundary>
  )
}
