import {
  CatchBoundary,
  createFileRoute,
} from '@tanstack/react-router'

import Loading from '@/components/Loading/Loading'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import SeasonPlayoffTables from '../-components/Playoff/SeasonPlayoffTables'
import { getPlayoffTable } from '../-functions/getPlayoffTable'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff/table',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getPlayoffTable({
      data: { year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: { breadcrumb: 'Slutspelsträd' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Slutspelsträd',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Slutspelsträd',
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
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonPlayoff" />,
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
          id="playofftables"
          error={error}
          reset={reset}
        />
      )}
    >
      <SeasonPlayoffTables />
    </CatchBoundary>
  )
}
