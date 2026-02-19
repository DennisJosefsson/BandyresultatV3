import Loading from '@/components/Loading/Loading'
import { createFileRoute } from '@tanstack/react-router'
import { getMapTeams } from './-functions/getMapTeams'
// import { lazy } from 'react'
// const NewMap = lazy(async () => await import('./-components/Map/Map'))
import Map from './-components/Map/Map'

export const Route = createFileRoute('/_layout/teams/map')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  component: MapComponent,
  loader: async ({ deps }) => {
    const data = await getMapTeams({ data: deps.women })
    return data
  },
  pendingComponent: () => <Loading page="seasonMap" />,
  staticData: { breadcrumb: 'Karta' },
})

function MapComponent() {
  return <Map />
}
