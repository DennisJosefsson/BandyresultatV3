import { useSidebar } from '@/components/base/ui/sidebar'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/base/ui/tabs'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import {
  CatchBoundary,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { validateGroup } from './-functions/validateGroup'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { year, group },
    deps: { women },
  }) => {
    const data = await validateGroup({
      data: { year, group, women },
    })

    return data
  },
  staticData: {
    breadcrumb: (match) => {
      return match.loaderData.breadCrumb ?? 'Serie'
    },
  },
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
          id="groupRoute"
          error={error}
          reset={reset}
        />
      )}
    >
      <Group />
    </CatchBoundary>
  )
}

function Group() {
  const sidebar = useSidebar()
  return (
    <div className="flex flex-col gap-2">
      {sidebar.open ? null : (
        <div>
          <Tabs>
            <TabsList>
              <TabsTrigger
                value="games"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/games"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Matcher
                  </Route.Link>
                }
                nativeButton={false}
              />
              <TabsTrigger
                value="table"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/tables/$table"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                      table: 'all',
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Tabell
                  </Route.Link>
                }
                nativeButton={false}
              />
              <TabsTrigger
                value="development"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/development"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      index: 0,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Utveckling
                  </Route.Link>
                }
                nativeButton={false}
              />
              <TabsTrigger
                value="interval"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/interval"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                      start: 0,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Intervall
                  </Route.Link>
                }
                nativeButton={false}
              />
              <TabsTrigger
                value="stats"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/stats"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Statistik
                  </Route.Link>
                }
                nativeButton={false}
              />
              <TabsTrigger
                value="map"
                render={
                  <Route.Link
                    to="/seasons/$year/$group/map"
                    params={(prev) => ({
                      year: prev.year,
                      group: prev.group,
                    })}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                    activeProps={{ 'data-state': 'active' }}
                  >
                    Karta
                  </Route.Link>
                }
                nativeButton={false}
              />
            </TabsList>
          </Tabs>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
