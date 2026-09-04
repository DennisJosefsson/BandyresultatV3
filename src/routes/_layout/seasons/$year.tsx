import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import { seasonIdCheck } from '@/lib/utils/utils'
import { zd } from '@/lib/utils/zod'
import type { NotFoundRouteProps } from '@tanstack/react-router'
import {
  Link,
  Outlet,
  createFileRoute,
  notFound,
  useChildMatches,
} from '@tanstack/react-router'
import SeasonHeader from './$year/-components/SeasonHeader'
import { getGroups } from './$year/-functions/getGroups'
import { getSeason } from './-functions/getSeason'

export const Route = createFileRoute(
  '/_layout/seasons/$year',
)({
  params: {
    parse: (params) => ({
      year: zd
        .number()
        .int()
        .min(1907)
        .parse(Number(params.year)),
    }),
    stringify: ({ year }) => ({
      year: `${year}`,
    }),
  },
  beforeLoad: async ({
    params: { year },
    search: { women },
    abortController,
  }) => {
    const seasonYear = seasonIdCheck.safeParse(year)
    if (seasonYear.error) {
      abortController.abort('Felaktigt säsongs-id')
      throw notFound({
        data: 'Felaktigt säsongs-id.',
      })
    }

    if (!seasonYear.data) {
      abortController.abort('Felaktigt säsongs-id')
      throw notFound({
        data: 'Felaktigt säsongs-id.',
      })
    }

    const season = await getSeason({
      data: { women, year: year },
    })
    if (!season) {
      abortController.abort('Säsongen finns inte')
      throw notFound({
        data: 'Säsongen finns inte.',
      })
    }

    return {
      sidebarSection: 'year',
      seasonYear: seasonYear.data,
      season,
    }
  },
  loaderDeps: ({ search: { women } }) => ({ women }),

  loader: async ({ params, deps, abortController }) => {
    const data = await getGroups({
      data: { year: params.year, women: deps.women },
      signal: abortController.signal,
    })

    if (!data) throw new Error('Missing groups data')

    return data
  },
  staticData: {
    breadcrumb: (match) => {
      return match.context.seasonYear ?? 'Säsong'
    },
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Säsong',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Säsong',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Säsong',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Säsong',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se/seasons',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: Season,
  notFoundComponent: (opts) => <NotFound opts={opts} />,
  pendingComponent: () => <Loading page="singleSeason" />,
})

function Season() {
  const childMatches = useChildMatches()
  if (childMatches.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <SeasonHeader />
        <div className="flex flex-row justify-center">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            Välj serie
          </h3>
        </div>
        <GroupList />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <CustomCatchBoundary id="Enskild säsong">
        <div className="xs:gap-2 mt-2 flex flex-col gap-1 px-0.5 sm:mt-4 md:gap-4">
          <SeasonHeader />
          <Outlet />
        </div>
      </CustomCatchBoundary>
    </div>
  )
}

function NotFound({ opts }: { opts: NotFoundRouteProps }) {
  if (opts.data && typeof opts.data === 'string') {
    return (
      <div className="flex flex-row justify-center mt-8">
        <span>
          {opts.data} Hitta annan säsong i{' '}
          <Link
            to="/seasons"
            search={{ women: false }}
            className="underline"
          >
            säsongslistan
          </Link>
          .
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center">
      Den länken finns inte.
    </div>
  )
}

function GroupList() {
  const data = Route.useLoaderData()
  const year = Route.useParams({ select: (s) => s.year })
  const women = Route.useSearch({ select: (s) => s.women })

  if (data.status === 200) {
    return (
      <div className="@container flex flex-col gap-2 p-1">
        <span className="text-xs sm:text-sm font-semibold">
          Seriespel
        </span>
        <div className="grid grid-cols-1 gap-2 @md:gap-4 @lg:grid-cols-3 @3xl:gap-10 @4xl:grid-cols-4">
          {data.groups.map((group) => {
            return (
              <Route.Link
                key={group.serieId.toString()}
                to="/seasons/$year/$group"
                params={{ group: group.group, year: year }}
                search={{ women: women }}
                className="flex w-full flex-row items-center justify-center border px-4 py-2 shadow-xs md:shadow-sm"
              >
                <span className="@sm:text-[10px] text-center text-[8px] font-semibold @md:text-xs @2xl:text-sm">
                  {group.name}
                </span>
              </Route.Link>
            )
          })}
        </div>
        <span className="text-xs sm:text-sm font-semibold">
          Cupspel
        </span>
        <div className="grid grid-cols-1 gap-2 @md:gap-4 @lg:grid-cols-3 @3xl:gap-10 @4xl:grid-cols-4">
          {data.cups.map((cup) => {
            return (
              <Route.Link
                key={cup.competitionId.toString()}
                to="/seasons/$year/cup/$competitionName/games"
                params={{
                  competitionName: cup.competitionName,
                  year: year,
                }}
                search={{ women: women }}
                className="flex w-full flex-row items-center justify-center border px-4 py-2 shadow-xs md:shadow-sm"
              >
                <span className="@sm:text-[10px] text-center text-[8px] font-semibold @md:text-xs @2xl:text-sm">
                  {cup.competitionName}
                </span>
              </Route.Link>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className="mt-4 flex flex-col justify-center text-sm">
      <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
        {data.message}
      </span>
    </div>
  )
}
