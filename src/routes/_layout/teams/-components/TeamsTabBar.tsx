import {
  Link,
  useLocation,
  useSearch,
} from '@tanstack/react-router'
import { ListIcon, MapIcon, SearchIcon } from 'lucide-react'

import { TabBarInline } from '@/components/TabBar/TabBar'
import { Button } from '@/components/base/ui/button'

const TeamsTabBar = () => {
  const search = useSearch({ from: '/_layout/teams' })
  const teamArray = useSearch({
    from: '/_layout/teams',
    select: (s) => s.teamArray,
  })

  const pathName = useLocation().pathname

  const disabled = teamArray
    ? Boolean(teamArray.length !== 2)
    : true

  const teamsTabBarObject = {
    tabBarArray: [
      {
        tab: (
          <Link
            to="/teams"
            search={search}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={
                    isActive && pathName.endsWith('teams')
                      ? 'default'
                      : 'outline'
                  }
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Laglista
                  </span>
                  <span className="md:hidden">
                    <ListIcon />
                  </span>
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'teams',
      },
      {
        tab: (
          <Link
            to="/teams/map"
            search={search}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                >
                  <span className="hidden md:inline-block">
                    Karta
                  </span>
                  <span className="md:hidden">
                    <MapIcon />
                  </span>
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'map',
      },

      {
        tab: (
          <Link
            to="/teams/compare"
            search={search}
            disabled={disabled}
          >
            {({ isActive }) => {
              return (
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="tabbar"
                  disabled={disabled}
                >
                  <span className="hidden md:inline-block">
                    Jämför
                  </span>
                  <span className="md:hidden">
                    <SearchIcon />
                  </span>
                </Button>
              )
            }}
          </Link>
        ),
        tabName: 'compare',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={teamsTabBarObject} />
    </>
  )
}

export default TeamsTabBar
