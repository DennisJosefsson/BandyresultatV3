import {
  CatchBoundary,
  createFileRoute,
  redirect,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'

import GroupListForErrorComponent from '../../-components/GroupListForErrorComponent'
import SeasonTables from '../../-components/SeasonTables'
import { getTables } from '../../-functions/getTables'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/tables/$table',
)({
  params: {
    parse: (params) => ({
      table: zd
        .enum(['all', 'away', 'home'])
        .catch('all')
        .parse(params.table),
    }),
    stringify: ({ table }) => ({ table: `${table}` }),
  },
  loaderDeps: ({ search: { women } }) => ({ women }),
  beforeLoad: ({ search, params }) => {
    if (
      search.women &&
      [1973, 1974].includes(params.year) &&
      params.table !== 'all'
    ) {
      throw redirect({
        to: '/seasons/$year/$group/tables/$table',
        params: {
          table: 'all',
          year: params.year,
          group: params.group,
        },
        search: { women: search.women },
      })
    }
  },
  loader: async ({ deps, params }) => {
    const data = await getTables({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        table: params.table,
      },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Tabell',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Tabell',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Tabell',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
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
  const data = Route.useLoaderData()
  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-col justify-center text-sm">
        <div className="mb-4 flex flex-row justify-center">
          <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
            {data.message}
          </span>
        </div>

        {data.message.includes('Välj en ny i listan') ? (
          <GroupListForErrorComponent />
        ) : null}
      </div>
    )
  }
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="seasonTables"
          error={error}
          reset={reset}
        />
      )}
    >
      <SeasonTables />
    </CatchBoundary>
  )
}
