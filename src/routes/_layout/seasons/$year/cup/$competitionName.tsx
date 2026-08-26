import { zd } from '@/lib/utils/zod'
import {
  Outlet,
  createFileRoute,
  useChildMatches,
} from '@tanstack/react-router'
import {
  CalendarIcon,
  ListIcon,
  TrophyIcon,
} from 'lucide-react'
import { getCompetition } from './-functions/getCompetition'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup/$competitionName',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  params: {
    parse: (params) => ({
      competitionName: zd
        .string()
        .parse(params.competitionName),
    }),
    stringify: ({ competitionName }) => ({
      competitionName: `${competitionName.replaceAll(' ', '_')}`,
    }),
  },
  loader: async ({
    deps: { women },
    params: { competitionName },
    context: { seasonYear },
  }) => {
    const data = await getCompetition({
      data: {
        competitionName,
        seasonYear,
        women,
      },
    })

    if (!data) throw new Error('Missing competition data')

    return { data }
  },

  staticData: {
    breadcrumb: (match) =>
      match.params.competitionName.replaceAll('_', ' ') ??
      'Cup',
  },
  head: ({ match }) => {
    const seasonYear = match.context.seasonYear
    const women = match.search.women
    return {
      meta: [
        {
          title: `Bandyresultat - ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:description',
          content: `Bandyresultat - Tabeller, matcher och slutspel i ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:title',
          content: `Bandyresultat - ${
            match.params.competitionName.replaceAll(
              '_',
              ' ',
            ) ?? 'Cup'
          } ${women ? 'damer' : 'herrar'} ${seasonYear}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: `https://bandyresultat.se/seasons/${match.params.year}}/cup/${match.params.competitionName}?women=${women}`,
        },
        {
          property: 'og:image',
          content:
            'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
        },
      ],
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const childMatches = useChildMatches()
  const data = Route.useLoaderData({
    select: (dataItem) => {
      if (!dataItem) {
        console.log(dataItem)
        throw new Error('dataItem is undefined')
      }
      return dataItem.data
    },
  })

  if (data.status === 404) {
    return (
      <div className="flex flex-row mt-4 justify-center">
        <span className="text.sm">{data.message}</span>
      </div>
    )
  }

  if (childMatches.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row mt-4 justify-center">
          <span className="text-sm font-semibold">
            {data.competition.competitionName}
          </span>
        </div>
        <div className="flex flex-row justify-center">
          <h3 className="text-xs font-semibold sm:text-sm">
            Välj sida
          </h3>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <Route.Link
            to="/seasons/$year/cup/$competitionName/games"
            params={(prev) => ({ ...prev })}
            search={(prev) => ({ ...prev })}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <CalendarIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Matcher
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/cup/$competitionName/tables"
            params={(prev) => ({ ...prev })}
            search={(prev) => ({ ...prev })}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <ListIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Tabeller
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/cup/$competitionName/playoff"
            params={(prev) => ({ ...prev })}
            search={(prev) => ({ ...prev })}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <TrophyIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Slutspelsträd
              </span>
            </div>
          </Route.Link>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row mt-4 justify-center">
        <span className="text-sm font-semibold">
          {data.competition.competitionName}
        </span>
      </div>
      <Outlet />
    </div>
  )
}
