import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup',
)({
  beforeLoad: () => {
    return { sidebarSection: 'cup' }
  },
  staticData: { breadcrumb: 'Cup' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Cup',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CustomCatchBoundary id="cup">
      <Cup />
    </CustomCatchBoundary>
  )
}

function Cup() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
