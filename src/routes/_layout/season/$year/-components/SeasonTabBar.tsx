import { TabBarInline } from '@/components/TabBar/TabBar'
import { Button } from '@/components/ui/button'
import { getRouteApi, Link, useParams, useSearch } from '@tanstack/react-router'
import {
  CalendarIcon,
  ChartLineIcon,
  ChevronsLeftRightEllipsisIcon,
  ListIcon,
  MarsIcon,
  TrophyIcon,
  VenusIcon,
} from 'lucide-react'

import { useMediaQuery } from 'usehooks-ts'

const route = getRouteApi('/_layout/season/$year')

const SeasonTabBar = () => {
  const matches = useMediaQuery('(min-width: 840px)')
  //const navigate = useNavigate()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const params = useParams({ strict: false })
  //   const pathname = useLocation({
  //     select: (location) => location.pathname,
  //   })
  const data = route.useLoaderData()

  const groupFromData =
    data.status === 204
      ? 'elitserien'
      : data.groups.length > 0
        ? data.groups[0].group
        : 'elitserien'

  const group = params.group ? params.group : groupFromData
  const table = params.table ?? 'all'
  const seasonTabBarObject = {
    gender: (
      <Link
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({ ...prev, women: !women })}
      >
        <Button size={matches ? 'default' : 'xs'}>
          {women ? (
            matches ? (
              'Herrar'
            ) : (
              <MarsIcon />
            )
          ) : matches ? (
            'Damer'
          ) : (
            <VenusIcon />
          )}
        </Button>
      </Link>
    ),
    tabBarArray: [
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/$group/games"
            params={(prev) => ({ year: prev.year, group: group })}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Matcher' : <CalendarIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'games',
      },
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/$group/tables/$table"
            params={(prev) => ({ year: prev.year, group, table })}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Tabell' : <ListIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'tables',
      },
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/playoff/table"
            params={(prev) => ({ year: prev.year })}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Slutspel' : <TrophyIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'playoff',
      },
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/$group/development"
            params={(prev) => ({ year: prev.year, group })}
            search={(prev) => ({ ...prev, index: 0 })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Utveckling' : <ChartLineIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'development',
      },
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/$group/interval"
            params={(prev) => ({ year: prev.year, group })}
            search={(prev) => ({ ...prev, start: 0 })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size={matches ? 'default' : 'xs'}
                >
                  {matches ? 'Intervall' : <ChevronsLeftRightEllipsisIcon />}
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'interval',
      },
      //   {
      //     tab: (
      //       <Link
      //         from="/season/$year"
      //         to="/season/$year/stats"
      //         params={{ year: year }}
      //         search={(prev) => ({ ...prev })}
      //         activeOptions={{ includeSearch: false }}
      //       >
      //         {({ isActive }) => {
      //           return (
      //             <Button
      //               variant={isActive ? 'default' : 'outline'}
      //               size={matches ? 'default' : 'xs'}
      //             >
      //               {matches ? 'Statistik' : <StatsIcon />}
      //             </Button>
      //           )
      //         }}
      //       </Link>
      //     ),

      //     tabName: 'stats',
      //   },
      //   {
      //     tab: (
      //       <Link
      //         from="/season/$year"
      //         to="/season/$year/map"
      //         params={{ year: year }}
      //         search={(prev) => ({ ...prev })}
      //         activeOptions={{ includeSearch: false }}
      //       >
      //         {({ isActive }) => {
      //           return (
      //             <Button
      //               variant={isActive ? 'default' : 'outline'}
      //               size={matches ? 'default' : 'xs'}
      //             >
      //               {matches ? 'Karta' : <MapIcon />}
      //             </Button>
      //           )
      //         }}
      //       </Link>
      //     ),
      //     tabName: 'map',
      //   },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={seasonTabBarObject} />
    </>
  )
}

export default SeasonTabBar
