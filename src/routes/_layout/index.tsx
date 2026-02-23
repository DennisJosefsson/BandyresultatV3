import { createFileRoute, Link, LinkProps } from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from './seasons/$year/-hooks/useGetFirstAndLastSeason'

export const Route = createFileRoute('/_layout/')({
  component: App,
})

function App() {
  return (
    <div className="font-inter mx-auto mb-2 flex h-100 flex-col gap-2">
      <div className="my-10 flex flex-col md:my-20 xl:mx-10 2xl:mx-16">
        <div className="mb-3 md:mb-6">
          <h1 className="text-primary pl-2 text-base font-bold sm:text-2xl lg:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-[280px] pl-2 md:w-[500px] lg:w-full">
          <h2 className="text-primary mb-4 text-sm font-bold sm:text-base lg:text-2xl">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
        </div>
      </div>
      <IndexPageLinks />
    </div>
  )
}

function IndexPageLinks() {
  const { lastSeason } = useGetFirstAndLastSeason()

  const mensLinks: (LinkProps & { key: string; linkName: string })[] = [
    {
      to: '/seasons/$year/$group/games',
      params: { group: 'elitserien', year: lastSeason },
      search: { women: false },
      key: 'mensGames',
      linkName: 'Matcher',
    },
    {
      to: '/seasons/$year/$group/tables/$table',
      params: { table: 'all', group: 'elitserien', year: lastSeason },
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
  const womensLinks: (LinkProps & { key: string; linkName: string })[] = [
    {
      to: '/seasons/$year/$group/games',
      params: { group: 'elitserien', year: lastSeason },
      search: { women: true },
      key: 'womensGames',
      linkName: 'Matcher',
    },
    {
      to: '/seasons/$year/$group/tables/$table',
      params: { table: 'all', group: 'elitserien', year: lastSeason },
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
    <div className="mx-40 grid grid-cols-2 gap-80">
      <div className="border-muted flex flex-col gap-8 border-2 p-10">
        <div className="flex flex-row justify-center">
          <span className="text-lg font-bold">Elitserien Herrar</span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {mensLinks.map((link) => {
            return (
              <div key={link.key} className="flex flex-row justify-center">
                <Link to={link.to} params={link.params} search={link.search}>
                  <span className="text-base font-semibold">
                    {link.linkName}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="border-muted flex flex-col gap-8 border-2 p-10">
        <div className="flex flex-row justify-center">
          <span className="text-lg font-bold">Elitserien Damer</span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {womensLinks.map((link) => {
            return (
              <div key={link.key} className="flex flex-row justify-center">
                <Link to={link.to} params={link.params} search={link.search}>
                  <span className="text-base font-semibold">
                    {link.linkName}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
