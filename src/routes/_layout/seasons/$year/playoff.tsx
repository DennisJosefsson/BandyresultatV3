import {
  CatchBoundary,
  Link,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/base/ui/tabs'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff',
)({
  staticData: { breadcrumb: 'Slutspel' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Slutspel',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="playoff"
          error={error}
          reset={reset}
        />
      )}
    >
      <Playoff />
    </CatchBoundary>
  )
}

function Playoff() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="">
        <Tabs>
          <TabsList>
            <TabsTrigger
              value="table"
              render={
                <Link
                  from="/seasons/$year/playoff"
                  to="/seasons/$year/playoff/table"
                  params={(prev) => ({ year: prev.year })}
                  search={(prev) => ({ women: prev.women })}
                  activeProps={{ 'data-state': 'active' }}
                >
                  Slutspel
                </Link>
              }
              nativeButton={false}
            />

            <TabsTrigger
              value="games"
              render={
                <Link
                  from="/seasons/$year/playoff"
                  to="/seasons/$year/playoff/games"
                  params={(prev) => ({ year: prev.year })}
                  search={(prev) => ({ women: prev.women })}
                  activeProps={{ 'data-state': 'active' }}
                >
                  Matcher
                </Link>
              }
              nativeButton={false}
            />

            <TabsTrigger
              value="stats"
              render={
                <Link
                  from="/seasons/$year/playoff"
                  to="/seasons/$year/playoff/stats"
                  params={(prev) => ({ year: prev.year })}
                  search={(prev) => ({ women: prev.women })}
                  activeProps={{ 'data-state': 'active' }}
                >
                  Statistik
                </Link>
              }
              nativeButton={false}
            />
          </TabsList>
        </Tabs>
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
