import { GameCard } from '@/components/Common/Games/GameCard'
import LandingCard from '@/components/Common/Landing/LandingCard'
import type { LinkProps } from '@tanstack/react-router'
import {
  Link,
  createFileRoute,
} from '@tanstack/react-router'
import { getIndexGames } from './-functions/getIndexGames'
import { useGetFirstAndLastSeason } from './seasons/$year/-hooks/useGetFirstAndLastSeason'

export const Route = createFileRoute('/_layout/')({
  loader: async () => {
    const games = await getIndexGames()
    if (!games) {
      throw new Error('Games missing from index route')
    }

    return games
  },
  component: App,
})

function App() {
  return (
    <div className="@container font-inter flex flex-col gap-2">
      <div className="mt-10 flex flex-col mx-1 @xs:mx-2 @3xl:mx-4 @7xl:mx-10">
        <div className="mb-3 md:mb-6">
          <h1 className="text-primary xs:text-base pl-2 text-sm font-bold sm:text-2xl xl:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-fit p-2 md:w-125 xl:w-full">
          <h2 className="xs:max-w-fit text-primary xs:text-sm mb-4 max-w-40 text-[10px] font-bold sm:text-base xl:text-2xl">
            Samlade resultat från de högsta serierna - 1907
            och framåt
          </h2>
        </div>
      </div>
      <IndexPageLinks />
      <IndexGames />
    </div>
  )
}

function IndexPageLinks() {
  const { lastSeason } = useGetFirstAndLastSeason()

  const mensLinks: Array<
    LinkProps & { key: string; linkName: string }
  > = [
    {
      to: '/seasons/$year/$group/games',
      params: { group: 'elitserien', year: lastSeason },
      search: { women: false },
      key: 'mensGames',
      linkName: 'Matcher',
    },
    {
      to: '/seasons/$year/$group/tables/$table',
      params: {
        table: 'all',
        group: 'elitserien',
        year: lastSeason,
      },
      search: { women: false },
      key: 'mensTable',
      linkName: 'Tabell',
    },
    {
      to: '/seasons/$year/playoff/table',
      params: { year: lastSeason },
      search: { women: false },
      key: 'mensPlayoff',
      linkName: 'Slutspel',
    },
  ]
  const womensLinks: Array<
    LinkProps & { key: string; linkName: string }
  > = [
    {
      to: '/seasons/$year/$group/games',
      params: { group: 'elitserien', year: lastSeason },
      search: { women: true },
      key: 'womensGames',
      linkName: 'Matcher',
    },
    {
      to: '/seasons/$year/$group/tables/$table',
      params: {
        table: 'all',
        group: 'elitserien',
        year: lastSeason,
      },
      search: { women: true },
      key: 'womensTable',
      linkName: 'Tabell',
    },
    {
      to: '/seasons/$year/playoff/table',
      params: { year: lastSeason },
      search: { women: true },
      key: 'womensPlayoff',
      linkName: 'Slutspel',
    },
  ]

  return (
    <div className="@container">
      <div className="mx-1 @xs:mx-2 @3xl:mx-4 @7xl:mx-10 grid grid-cols-1 gap-y-4 @5xl:grid-cols-2 @5xl:gap-x-20">
        <LandingCard>
          <LandingCard.Gender>
            Elitserien Herrar
          </LandingCard.Gender>
          <LandingCard.Content>
            {mensLinks.map((link) => {
              return (
                <div
                  key={link.key}
                  className="flex flex-row justify-center"
                >
                  <Link
                    to={link.to}
                    params={link.params}
                    search={link.search}
                  >
                    <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
                      {link.linkName}
                    </span>
                  </Link>
                </div>
              )
            })}
          </LandingCard.Content>
        </LandingCard>
        <LandingCard>
          <LandingCard.Gender>
            Elitserien Damer
          </LandingCard.Gender>
          <LandingCard.Content>
            {womensLinks.map((link) => {
              return (
                <div
                  key={link.key}
                  className="flex flex-row justify-center"
                >
                  <Link
                    to={link.to}
                    params={link.params}
                    search={link.search}
                  >
                    <span className="xs:text-xs text-[10px] font-semibold md:text-sm">
                      {link.linkName}
                    </span>
                  </Link>
                </div>
              )
            })}
          </LandingCard.Content>
        </LandingCard>
      </div>
    </div>
  )
}

function IndexGames() {
  const data = Route.useLoaderData()
  if (data.status === 404) return null
  return (
    <div className="@container flex flex-col gap-4 mt-2 @5xl:mt-6">
      <div className="flex flex-row justify-center">
        <span className="text-sm font-semibold">
          Kommande matcher
        </span>
      </div>
      <div className="mx-1 @xs:mx-2 @3xl:mx-4 @7xl:mx-10 grid grid-cols-1 gap-y-4 @5xl:grid-cols-2 @5xl:gap-x-20">
        {data.games.map((game) => {
          const serieName = `${game.group.includes('cup-') ? game.competition.competitionName + ' ' : null}${game.serie.serieName}`
          return (
            <GameCard
              key={game.gameId.toString()}
              serieName={serieName}
              routePath="/"
              game={game}
            />
          )
        })}
      </div>
    </div>
  )
}
