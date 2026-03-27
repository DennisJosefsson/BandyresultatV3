import {
  CatchBoundary,
  Navigate,
  createFileRoute,
} from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'

import DevelopmentData from '../-components/Development/DevelopmentData'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { getDevData } from '../-functions/getDevData'

const searchParams = zd.object({ index: zd.int().catch(0) })

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/development',
)({
  validateSearch: zodValidator(searchParams),
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params, deps }) => {
    const data = await getDevData({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
        origin: 'development',
      },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'Utveckling',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Tabellutveckling',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Tabellutveckling',
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
          id="development"
          error={error}
          reset={reset}
        />
      )}
    >
      <Development />
    </CatchBoundary>
  )
}

function Development() {
  const data = Route.useLoaderData()

  const index = Route.useSearch({ select: (s) => s.index })
  if (data.status === 404) return null
  if (index >= data.dates.length) {
    return (
      <Navigate
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({ ...prev, index: 0 })}
      />
    )
  }

  return <DevelopmentData />
}
