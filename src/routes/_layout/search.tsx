import { clientSearchParams } from '@/lib/types/search'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { getSearchTeams } from './search/-functions/getSearchTeams'
import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'

export const Route = createFileRoute('/_layout/search')({
  beforeLoad: () => {
    return { sidebarSection: 'search' }
  },
  staticData: { breadcrumb: 'Sök' },
  validateSearch: clientSearchParams,
  loader: async () => {
    const teams = await getSearchTeams()
    if (!teams) throw new Error('Missing teams data')

    return teams
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <CustomCatchBoundary id="Sök">
        <Outlet />
      </CustomCatchBoundary>
    </div>
  )
}
