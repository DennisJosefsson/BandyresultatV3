import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import Loading from '@/components/Loading/Loading'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { getTeamsForPlayoffMap } from '../-functions/getTeamForPlayoffMap'
import PlayoffMap from '../-components/Maps/PlayoffMap'

export const Route = createFileRoute('/_layout/seasons/$year/playoff/map')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getTeamsForPlayoffMap({
      data: { year: params.year, women: deps.women },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  staticData: { breadcrumb: 'Karta' },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title ?? 'Bandyresultat - Karta',
      },
      {
        name: 'description',
        content: loaderData?.meta.description ?? 'Bandyresultat - Karta',
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description ?? 'Bandyresultat - Karta',
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title ?? 'Bandyresultat - Karta',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: loaderData?.meta.url ?? 'https://www.bandyresultat.se',
      },
      {
        property: 'og:image',
        content:
          'https://github.com/DennisJosefsson/WebsiteImages/blob/main/bandyresultat.jpg?raw=true',
      },
    ],
  }),
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonStats" />,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  if (data.status === 404) {
    return (
      <div className="mt-4 flex flex-col justify-center text-sm">
        <div className="mb-4 flex flex-row justify-center">
          <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
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
        <SimpleErrorComponent id="playoffmap" error={error} reset={reset} />
      )}
    >
      <PlayoffMap />
    </CatchBoundary>
  )
}
