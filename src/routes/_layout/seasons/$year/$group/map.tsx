import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import Loading from '@/components/Loading/Loading'
import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { getTeamsForGroupMap } from '../-functions/getTeamsForGroupMap'
import GroupMap from '../-components/Maps/GroupMap'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'

export const Route = createFileRoute('/_layout/seasons/$year/$group/map')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    const data = await getTeamsForGroupMap({
      data: {
        group: params.group,
        year: params.year,
        women: deps.women,
      },
    })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonStats" />,

  staticData: {
    breadcrumb: (match) => {
      if (match.loaderData.breadCrumb === undefined) {
        return 'Karta'
      }

      return match.loaderData.breadCrumb
    },
  },
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

        {data.message.includes('Välj en ny i listan') ? <GroupListForErrorComponent /> : null}
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
        <SimpleErrorComponent id="groupmap" error={error} reset={reset} />
      )}
    >
      <GroupMap />
    </CatchBoundary>
  )
}
