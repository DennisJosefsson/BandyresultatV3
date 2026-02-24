import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  createFileRoute,
  Navigate,
  notFound,
} from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
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
    if (data.status === 404) {
      throw notFound({
        data: data.message,
        routeId: '/_layout/seasons/$year/$group/',
      })
    }

    return data
  },
  component: RouteComponent,
  notFoundComponent(props) {
    if (props.data && typeof props.data === 'string') {
      return (
        <div className="mt-4 flex flex-col justify-center text-sm">
          <div className="mb-4 flex flex-row justify-center">
            <p>{props.data}</p>
          </div>

          {props.data.includes('Välj en ny i listan') ? (
            <GroupListForErrorComponent />
          ) : null}
        </div>
      )
    }
    return (
      <div className="mt-4 flex flex-row justify-center">
        <p>Något gick tyvärr fel.</p>
      </div>
    )
  },
  staticData: { breadcrumb: (match) => match.loaderData.breadCrumb },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description,
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: loaderData?.meta.url,
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
  return (
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent id="development" error={error} reset={reset} />
      )}
    >
      <Development />
    </CatchBoundary>
  )
}

function Development() {
  const data = Route.useLoaderData()
  const index = Route.useSearch({ select: (s) => s.index })
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
