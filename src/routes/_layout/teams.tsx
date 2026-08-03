import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
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
  staticData: { breadcrumb: 'Laglista' },
})

function TeamsHeader() {
  return (
    <div className="font-inter text-foreground mb-2 min-h-screen px-1">
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent
            id="teams"
            error={error}
            reset={reset}
          />
        )}
      >
        <Outlet />
      </CatchBoundary>
    </div>
  )
}
