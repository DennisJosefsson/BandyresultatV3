import { z } from 'zod'
import { CatchBoundary, Outlet, createFileRoute } from '@tanstack/react-router'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { Card, CardContent } from '@/components/base/ui/card'
import { getTeams } from './teams/-functions/getTeams'
import TeamsTabBar from './teams/-components/TeamsTabBar'

const searchParams = z.object({
  women: z.boolean(),
  teamArray: z.array(z.number()).optional(),
})

export const Route = createFileRoute('/_layout/teams')({
  validateSearch: searchParams,
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps }) => {
    const data = await getTeams({ data: deps.women })
    if (!data) throw new Error('Missing teams data')

    return data
  },
  component: TeamsHeader,
  staticData: { breadcrumb: 'Lag' },
})

function TeamsHeader() {
  return (
    <div className="font-inter text-foreground mb-2 min-h-screen px-1">
      <Card>
        <CardContent>
          <TeamsTabBar />
        </CardContent>
      </Card>

      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent id="teams" error={error} reset={reset} />
        )}
      >
        <Outlet />
      </CatchBoundary>
    </div>
  )
}
