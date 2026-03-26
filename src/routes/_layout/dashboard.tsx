import {
  CatchBoundary,
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router'

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/base/ui/tabs'
import { cn } from '@/lib/utils/utils'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { authStateFn } from './dashboard/-functions/authStateFn'
import { getDashboardData } from './dashboard/-functions/getDashboardData'

export const Route = createFileRoute('/_layout/dashboard')({
  beforeLoad: async () => {
    const { isAdmin } = await authStateFn()

    if (!isAdmin) {
      throw Route.redirect({
        to: '/unauthorized',
        search: (prev) => ({ women: prev.women ?? false }),
        statusCode: 401,
        state: {
          redirectCause:
            'Du måste vara inloggad för att se denna sida.',
        },
      })
    }

    return
  },
  loader: async () => {
    const data = await getDashboardData()

    if (!data) throw new Error('Missing dashboard data.')

    return data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const womenSeason = Route.useLoaderData({
    select: (s) =>
      s.lastSeasons.find((season) => season.women === true),
  })
  const menSeason = Route.useLoaderData({
    select: (s) =>
      s.lastSeasons.find(
        (season) => season.women === false,
      ),
  })

  const pathname = useLocation().pathname

  return (
    <div>
      <div className="">
        <Tabs>
          <TabsList>
            <TabsTrigger
              nativeButton={false}
              value="seasons"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/seasons"
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{ 'data-state': 'active' }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Säsonger
                </Link>
              }
            />

            <TabsTrigger
              nativeButton={false}
              value="newSeason"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/newseason"
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    'data-state': 'active',
                  }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Generera ny säsong
                </Link>
              }
            />

            {womenSeason ? (
              <TabsTrigger
                nativeButton={false}
                value="womenseason"
                render={
                  <Link
                    from={Route.fullPath}
                    to="/dashboard/season/$seasonId"
                    params={{
                      seasonId: womenSeason.seasonId,
                    }}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                  >
                    {({ isActive }) => {
                      return (
                        <span
                          className={cn(
                            '',
                            isActive &&
                              pathname.endsWith(
                                womenSeason.seasonId.toString(),
                              )
                              ? 'font-semibold'
                              : undefined,
                          )}
                        >
                          Dam {womenSeason.year}
                        </span>
                      )
                    }}
                  </Link>
                }
              />
            ) : null}
            {menSeason ? (
              <TabsTrigger
                nativeButton={false}
                value="menseason"
                render={
                  <Link
                    from={Route.fullPath}
                    to="/dashboard/season/$seasonId"
                    params={{
                      seasonId: menSeason.seasonId,
                    }}
                    search={(prev) => ({
                      women: prev.women,
                    })}
                  >
                    {({ isActive }) => {
                      return (
                        <span
                          className={cn(
                            'font-normal',
                            isActive &&
                              pathname.endsWith(
                                menSeason.seasonId.toString(),
                              )
                              ? 'font-semibold'
                              : undefined,
                          )}
                        >
                          Herr {menSeason.year}
                        </span>
                      )
                    }}
                  </Link>
                }
              />
            ) : null}

            <TabsTrigger
              nativeButton={false}
              value="unplayedEarlierGames"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/games/$today"
                  params={{ today: 'false' }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    'data-state': 'active',
                  }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Tidigare matcher{' '}
                  {`[${data.earlierUnplayedGamesCount}]`}
                </Link>
              }
            />

            <TabsTrigger
              nativeButton={false}
              value="todaysUnplayedGames"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/games/$today"
                  params={{ today: 'true' }}
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    'data-state': 'active',
                  }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Dagens matcher{' '}
                  {`[${data.todaysUnplayedGamesCount}]`}
                </Link>
              }
            />

            <TabsTrigger
              nativeButton={false}
              value="teamslist"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/teams"
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    'data-state': 'active',
                  }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Laglista
                </Link>
              }
            />

            <TabsTrigger
              nativeButton={false}
              value="newTeam"
              render={
                <Link
                  from={Route.fullPath}
                  to="/dashboard/teams/add"
                  search={(prev) => ({
                    women: prev.women,
                  })}
                  activeProps={{
                    'data-state': 'active',
                  }}
                  activeOptions={{
                    includeSearch: false,
                    exact: true,
                  }}
                >
                  Lägg till lag
                </Link>
              }
            />
          </TabsList>
        </Tabs>
      </div>
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent
            id="layout"
            error={error}
            reset={reset}
          />
        )}
      >
        <div className="m-2">
          <Outlet />
        </div>
      </CatchBoundary>
    </div>
  )
}
