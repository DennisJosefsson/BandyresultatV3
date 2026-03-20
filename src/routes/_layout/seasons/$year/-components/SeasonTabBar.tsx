import {
  Link,
  getRouteApi,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import {
  CalendarIcon,
  ChartLineIcon,
  ChevronsLeftRightEllipsisIcon,
  ListIcon,
  MarsIcon,
  TrophyIcon,
  VenusIcon,
} from 'lucide-react'

import { TabBarInline } from '@/components/TabBar/TabBar'
import { Button } from '@/components/base/ui/button'

const route = getRouteApi('/_layout/seasons/$year')

const SeasonTabBar = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const params = useParams({ strict: false })
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
        <Button size="tabbar">
          <span className="hidden md:inline-block">
            {women ? 'Herrar' : 'Damer'}
          </span>
          <span className="md:hidden">
            {women ? <MarsIcon /> : <VenusIcon />}
          </span>
        </Button>
      </Link>
    ),
    tabBarArray: [
      {
        tab: (
          <Link
            from="/seasons/$year"
            to="/seasons/$year/$group/games"
            params={(prev) => ({
              year: prev.year,
              group: group,
            })}
            search={{ women }}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Matcher
                  </span>
                  <span className="md:hidden">
                    <CalendarIcon />
                  </span>
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
            from="/seasons/$year"
            to="/seasons/$year/$group/tables/$table"
            params={(prev) => ({
              year: prev.year,
              group,
              table,
            })}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Tabell
                  </span>
                  <span className="md:hidden">
                    <ListIcon />
                  </span>
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
            from="/seasons/$year"
            to="/seasons/$year/playoff/table"
            params={(prev) => ({ year: prev.year })}
            search={(prev) => ({ ...prev })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Slutspel
                  </span>
                  <span className="md:hidden">
                    <TrophyIcon />
                  </span>
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
            from="/seasons/$year"
            to="/seasons/$year/$group/development"
            params={(prev) => ({ year: prev.year, group })}
            search={(prev) => ({ ...prev, index: 0 })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Utveckling
                  </span>
                  <span className="md:hidden">
                    <ChartLineIcon />
                  </span>
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
            from="/seasons/$year"
            to="/seasons/$year/$group/interval"
            params={(prev) => ({ year: prev.year, group })}
            search={(prev) => ({ ...prev, start: 0 })}
            activeOptions={{ includeSearch: false }}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Intervall
                  </span>
                  <span className="md:hidden">
                    <ChevronsLeftRightEllipsisIcon />
                  </span>
                </Button>
              )
            }}
          </Link>
        ),

        tabName: 'interval',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={seasonTabBarObject} />
    </>
  )
}

export default SeasonTabBar
