import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import { zd } from '@/lib/utils/zod'
import {
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { z } from 'zod'
import { getTeams } from './teams/-functions/getTeams'

const searchParams = z.object({
  women: zd.boolean(),
  teamArray: zd.array(z.number()).optional(),
  error: zd.string().optional(),
})

export const Route = createFileRoute('/_layout/teams')({
  validateSearch: searchParams,
  beforeLoad: () => {
    return { sidebarSection: 'teams' }
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getTeams({ data: deps.women })
    if (!data) throw new Error('Missing teams data')

    return data
  },
  component: TeamsHeader,
})

function TeamsHeader() {
  return (
    <div className="font-inter text-foreground mb-2 min-h-screen px-1">
      <CustomCatchBoundary id="teams">
        <Outlet />
      </CustomCatchBoundary>
    </div>
  )
}
