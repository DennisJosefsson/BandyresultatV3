import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import {
  CatchBoundary,
  createFileRoute,
  notFound,
} from '@tanstack/react-router'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { SeasonGames } from '../-components/SeasonGames'
import { getGames } from '../-functions/getGames'

export const Route = createFileRoute('/_layout/seasons/$year/$group/games')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ deps, params }) => {
    if (!params.group) throw notFound()
    const data = await getGames({
      data: { group: params.group, year: params.year, women: deps.women },
    })
    if (data.status === 404) {
      throw notFound({ data: data.message })
    }
    return data
  },
  component: RouteComponent,
  pendingComponent: () => <Loading page="seasonGamesList" />,
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
        <SimpleErrorComponent id="seasonGames" error={error} reset={reset} />
      )}
    >
      <SeasonGames />
    </CatchBoundary>
  )
}
