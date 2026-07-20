import LandingCard from '@/components/Common/Landing/LandingCard'
import type { LinkProps } from '@tanstack/react-router'
import {
  Link,
  createFileRoute,
} from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from './seasons/$year/-hooks/useGetFirstAndLastSeason'

export const Route = createFileRoute('/_layout/')({
  component: App,
})

function App() {
  return (
    <div className="font-inter mx-2 sm:mx-8 mt-6 sm:mt-12 flex flex-col gap-2 max-h-80svh">
      <div className="my-10 flex flex-col xl:mx-10 2xl:mx-16">
        <div className="mb-3 md:mb-6">
          <h1 className="text-primary pl-2 text-sm xs:text-base font-bold sm:text-2xl xl:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-70 pl-2 md:w-125 xl:w-full">
          <h2 className="max-w-40 xs:max-w-fit text-primary mb-4 text-[10px] xs:text-sm font-bold sm:text-base xl:text-2xl">
            Samlade resultat från de högsta serierna - 1907
            och framåt
          </h2>
        </div>
      </div>
      <IndexPageLinks />
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
    <div className="grid grid-cols-1 gap-4 sm:gap-12 xl:grid-cols-2">
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
                  <span className="text-[10px] xs:text-xs font-semibold md:text-sm xl:text-base">
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
                  <span className="text-[10px] xs:text-xs font-semibold md:text-sm xl:text-base">
                    {link.linkName}
                  </span>
                </Link>
              </div>
            )
          })}
        </LandingCard.Content>
      </LandingCard>
    </div>
  )
}
