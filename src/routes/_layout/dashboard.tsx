import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/utils'
import {
  CatchBoundary,
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'
import { getDashboardData } from './dashboard/-functions/getDashboardData'

export const Route = createFileRoute('/_layout/dashboard')({
  //beforeLoad: () => authStateFn(),
  loader: () => getDashboardData(),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const womenSeason = Route.useLoaderData({
    select: (s) => s.lastSeasons.find((season) => season.women === true),
  })
  const menSeason = Route.useLoaderData({
    select: (s) => s.lastSeasons.find((season) => season.women === false),
  })

  const pathname = useLocation().pathname

  return (
    <div>
      <div className="">
        <Tabs>
          <TabsList>
            <TabsTrigger value="seasons" asChild>
              <Link
                from={Route.fullPath}
                to="/dashboard/seasons"
                search={(prev) => ({ women: prev.women })}
                // activeProps={{ 'data-state': 'active' }}
                // activeOptions={{ includeSearch: false, exact: true }}
              >
                Säsonger
              </Link>
            </TabsTrigger>
            {womenSeason ? (
              <TabsTrigger value="seasons" asChild>
                <Link
                  from={Route.fullPath}
                  to="/dashboard/season/$seasonId"
                  params={{ seasonId: womenSeason.seasonId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  {({ isActive }) => {
                    return (
                      <span
                        className={cn(
                          '',
                          isActive &&
                            pathname.endsWith(womenSeason.seasonId.toString())
                            ? 'font-semibold'
                            : undefined,
                        )}
                      >
                        Dam {womenSeason.year}
                      </span>
                    )
                  }}
                </Link>
              </TabsTrigger>
            ) : null}
            {menSeason ? (
              <TabsTrigger value="seasons" asChild>
                <Link
                  from={Route.fullPath}
                  to="/dashboard/season/$seasonId"
                  params={{ seasonId: menSeason.seasonId }}
                  search={(prev) => ({ women: prev.women })}
                >
                  {({ isActive }) => {
                    return (
                      <span
                        className={cn(
                          'font-normal',
                          isActive &&
                            pathname.endsWith(menSeason.seasonId.toString())
                            ? 'font-semibold'
                            : undefined,
                        )}
                      >
                        Herr {menSeason.year}
                      </span>
                    )
                  }}
                </Link>
              </TabsTrigger>
            ) : null}

            <TabsTrigger value="unplayedEarlierGames" asChild>
              <Link
                from={Route.fullPath}
                to="/dashboard/games/$today"
                params={{ today: 'false' }}
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
                activeOptions={{ includeSearch: false, exact: true }}
              >
                Tidigare matcher {`[${data.earlierUnplayedGamesCount}]`}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="todaysUnplayedGames" asChild>
              <Link
                from={Route.fullPath}
                to="/dashboard/games/$today"
                params={{ today: 'true' }}
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
                activeOptions={{ includeSearch: false, exact: true }}
              >
                Dagens matcher {`[${data.todaysUnplayedGamesCount}]`}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="newSeason" asChild>
              <Link
                from={Route.fullPath}
                to="/dashboard/newseason"
                search={(prev) => ({ women: prev.women })}
                activeProps={{ 'data-state': 'active' }}
                activeOptions={{ includeSearch: false, exact: true }}
              >
                Generera ny säsong
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent id="layout" error={error} reset={reset} />
        )}
      >
        <div className="m-2">
          <Outlet />
        </div>
      </CatchBoundary>
    </div>
  )
}
