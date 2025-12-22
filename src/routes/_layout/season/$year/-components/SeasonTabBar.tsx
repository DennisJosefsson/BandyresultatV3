import { TabBarInline } from '@/components/TabBar/TabBar'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { CalendarIcon, ListIcon, MarsIcon, VenusIcon } from 'lucide-react'

import { useMediaQuery } from 'usehooks-ts'

const SeasonTabBar = () => {
  const matches = useMediaQuery('(min-width: 840px)')
  const navigate = useNavigate()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })

  //   const pathname = useLocation({
  //     select: (location) => location.pathname,
  //   })

  const seasonTabBarObject = {
    gender: (
      <Button
        onClick={() =>
          navigate({
            to: '.',
            search: { women: !women },
            params: (prev) => ({ ...prev }),
            replace: false,
          })
        }
        size={matches ? 'default' : 'xs'}
      >
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
    ),
    tabBarArray: [
      {
        tab: (
          <Link
            from="/season/$year"
            to="/season/$year/{-$group}/games"
            params={(prev) => ({ ...prev })}
            search={(prev) => ({ ...prev })}
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
            to="/season/$year/{-$group}/tables"
            params={(prev) => ({ ...prev })}
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
      //   {
      //     tab: (
      //       <Link
      //         from="/season/$year"
      //         to="/season/$year/playoff"
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
      //               {matches ? 'Slutspel' : <TrophyIcon />}
      //             </Button>
      //           )
      //         }}
      //       </Link>
      //     ),

      //     tabName: 'playoff',
      //   },
      //   {
      //     tab: (
      //       <Link
      //         from="/season/$year"
      //         to="/season/$year/development"
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
      //               {matches ? 'Utveckling' : <DevIcon />}
      //             </Button>
      //           )
      //         }}
      //       </Link>
      //     ),

      //     tabName: 'development',
      //   },
      //   {
      //     tab: (
      //       <Link
      //         from="/season/$year"
      //         to="/season/$year/interval"
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
      //               {matches ? 'Intervall' : <ChevronsLeftRightEllipsis />}
      //             </Button>
      //           )
      //         }}
      //       </Link>
      //     ),

      //     tabName: 'interval',
      //   },
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
