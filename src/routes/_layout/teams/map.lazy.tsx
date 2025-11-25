import Loading from '@/components/Loading/Loading'
import { createLazyFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
const Map = lazy(async () => await import('./-components/Map/Map'))

export const Route = createLazyFileRoute('/_layout/teams/map')({
  component: MapComponent,
  pendingComponent: () => <Loading page="seasonMap" />,
})

function MapComponent() {
  return <Map />
}
