import type { T as FavTeam } from '@/lib/cookieFunctions/favTeams'
import { setFavTeamsServerFn } from '@/lib/cookieFunctions/favTeams'
import type { T as SortGames } from '@/lib/cookieFunctions/sortGames'
import { setSortGamesServerFn } from '@/lib/cookieFunctions/sortGames'
import type { T as SortPlayedGames } from '@/lib/cookieFunctions/sortPlayedGames'
import { setSortPlayedGamesServerFn } from '@/lib/cookieFunctions/sortPlayedGames'
import type { T as SortUnplayedGames } from '@/lib/cookieFunctions/sortUnplayedGames'
import { setSortUnplayedGamesServerFn } from '@/lib/cookieFunctions/sortUnplayedGames'
import { useRouter } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import { createContext, use } from 'react'

type CookieContext = {
  favTeams: FavTeam
  setFavTeams: (val: FavTeam) => void
  sortGames: SortGames
  setSortGames: (
    val: SortGames,
    route: RoutesToInvalidate,
  ) => void
  sortPlayedGames: SortPlayedGames
  setSortPlayedGames: (
    val: SortPlayedGames,
    route: RoutesToInvalidate,
  ) => void
  sortUnplayedGames: SortUnplayedGames
  setSortUnplayedGames: (
    val: SortUnplayedGames,
    route: RoutesToInvalidate,
  ) => void
}
type Props = PropsWithChildren<{
  favTeams: FavTeam
  sortGames: SortGames
  sortPlayedGames: SortPlayedGames
  sortUnplayedGames: SortUnplayedGames
}>

const CookieContext = createContext<CookieContext | null>(
  null,
)

export type RoutesToInvalidate =
  | '/_layout/seasons/$year/$group/games'
  | '/_layout/seasons/$year/playoff/games'

export function CookieProvider({
  children,
  favTeams,
  sortGames,
  sortPlayedGames,
  sortUnplayedGames,
}: Props) {
  const router = useRouter()

  function setFavTeams(val: FavTeam) {
    setFavTeamsServerFn({ data: val }).then(() =>
      router.invalidate(),
    )
  }

  function setSortGames(
    val: SortGames,
    route: RoutesToInvalidate,
  ) {
    setSortGamesServerFn({ data: val }).then(() =>
      router.invalidate({
        filter: (r) => r.routeId === route,
      }),
    )
  }

  function setSortPlayedGames(
    val: SortPlayedGames,
    route: RoutesToInvalidate,
  ) {
    setSortPlayedGamesServerFn({ data: val }).then(() =>
      router.invalidate({
        filter: (r) => r.routeId === route,
      }),
    )
  }

  function setSortUnplayedGames(
    val: SortUnplayedGames,
    route: RoutesToInvalidate,
  ) {
    setSortUnplayedGamesServerFn({ data: val }).then(() =>
      router.invalidate({
        filter: (r) => r.routeId === route,
      }),
    )
  }

  return (
    <CookieContext
      value={{
        favTeams,
        setFavTeams,
        sortGames,
        setSortGames,
        sortPlayedGames,
        setSortPlayedGames,
        sortUnplayedGames,
        setSortUnplayedGames,
      }}
    >
      {children}
    </CookieContext>
  )
}

export function useCookies() {
  const val = use(CookieContext)
  if (!val)
    throw new Error(
      'useCookies called outside of CookieProvider!',
    )
  return val
}
