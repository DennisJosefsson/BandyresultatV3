import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import IntervalSkeleton from '@/components/Loading/Skeletons/IntervalSkeleton'
import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import { zd } from '@/lib/utils/zod'
import {
  Await,
  Navigate,
  createFileRoute,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import RangeData from '../-components/Interval/RangeData'
import { getDevAndIntMeta } from '../-functions/devAndInt/getDevAndIntMeta'
import { getDevData } from '../-functions/devAndInt/getDevData'

const searchParams = zd.object({
  start: zd.int().nonnegative().catch(0),
  end: zd.int().nonnegative().optional(),
})

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/interval',
)({
  validateSearch: searchParams,
  loaderDeps: ({ search: { women } }) => ({
    women,
  }),
  shouldReload: false,
  loader: async ({ params, deps }) => {
    const intMeta = await getDevAndIntMeta({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        origin: 'development',
      },
    })
    const data = getDevData({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data || !intMeta) throw new Error('Missing data')

    return { data, intMeta }
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Intervall',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.intMeta.meta.title ??
          'Bandyresultat - Intervall',
      },
      {
        property: 'og:description',
        content:
          loaderData?.intMeta.meta.description ??
          'Bandyresultat - Intervall',
      },
      {
        property: 'og:title',
        content:
          loaderData?.intMeta.meta.title ??
          'Bandyresultat - Intervall',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.intMeta.meta.url ??
          'https://www.bandyresultat.se',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
})

function RouteComponent() {
  const promiseData = Route.useLoaderData({
    select: (s) => s.data,
  })
  return (
    <Await
      promise={promiseData}
      fallback={<IntervalSkeleton />}
    >
      {(data) => {
        if (!data) return null
        if (data.status === 404) {
          return (
            <div className="mt-4 flex flex-col justify-center text-sm">
              <div className="mb-4 flex flex-row justify-center">
                <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
                  {data.message}
                </span>
              </div>

              {data.message.includes(
                'Välj en ny i listan',
              ) ? (
                <GroupListForErrorComponent />
              ) : null}
            </div>
          )
        }
        return (
          <CustomCatchBoundary id="interval">
            <Interval {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}

type IntervalDataProps = {
  tables: Array<{
    date: string
    table: Array<ReturnDevDataTableItem>
  }>

  games: Array<{
    date: string
    games: Array<Omit<Game, 'season'>>
  }>
  serie: Serie
  dates: Array<string>
}

function Interval({
  tables,
  games,
  serie,
  dates,
}: IntervalDataProps) {
  const start = Route.useSearch({ select: (s) => s.start })
  const end = Route.useSearch({ select: (s) => s.end })
  const navigate = Route.useNavigate()
  const cause = Route.useMatch({ select: (s) => s.cause })

  useEffect(() => {
    const dataLength = games.length
    if (
      cause === 'stay' &&
      start !== 0 &&
      end !== dataLength - 1
    ) {
      navigate({
        to: '.',
        params: (prev) => ({ year: prev.year }),
        search: (prev) => ({
          women: prev.women,
          start: 0,
          end: dataLength - 1,
        }),
      })
    }
  }, [games])

  if (
    (end && end >= dates.length) ||
    start >= dates.length ||
    (end && start >= end)
  ) {
    return (
      <Navigate
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({
          ...prev,
          start: 0,
          end: dates.length - 1,
        })}
      />
    )
  }

  return (
    <RangeData
      serie={serie}
      tables={tables}
      dates={dates}
    />
  )
}
