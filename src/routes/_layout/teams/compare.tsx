import { CustomCatchBoundary } from '@/components/ErrorComponents/CustomCatchBoundary'
import Loading from '@/components/Loading/Loading'
import {
  Await,
  Navigate,
  createFileRoute,
} from '@tanstack/react-router'
import Compare from './-components/Compare/Compare'
import { getCompareTeams } from './-functions/compare'
import { getCompareMeta } from './-functions/getCompareMeta'

export const Route = createFileRoute(
  '/_layout/teams/compare',
)({
  loaderDeps: ({ search: searchDeps }) => searchDeps,
  loader: async ({ deps }) => {
    const compareMeta = await getCompareMeta({ data: deps })
    const data = getCompareTeams({ data: deps })
    if (!data || !compareMeta)
      throw new Error('Missing data')

    return { data, compareMeta }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} />
  ),

  pendingComponent: () => <Loading page="compare" />,

  staticData: {
    breadcrumb: (match) =>
      match.loaderData.breadCrumb ?? 'H2H',
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.compareMeta.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        name: 'description',
        content:
          loaderData?.compareMeta.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:description',
        content:
          loaderData?.compareMeta.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:title',
        content:
          loaderData?.compareMeta.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.compareMeta.meta.url ??
          'https://bandyresultat.se/',
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
    <Await promise={promiseData}>
      {(data) => {
        if (!data) return null
        if (data.status === 400 || data.status === 404) {
          return (
            <Navigate
              from="/teams/compare"
              to="/teams/list"
              search={(prev) => ({
                women: prev.women,
                teamArray: data.teamArray,
                error: data.message,
              })}
            />
          )
        }
        return (
          <CustomCatchBoundary id="compare">
            <Compare {...data} />
          </CustomCatchBoundary>
        )
      }}
    </Await>
  )
}

function ErrorComponent({ error }: { error: unknown }) {
  if (error && error instanceof Error) {
    return (
      <div className="font-inter mt-2 flex flex-row items-center justify-center">
        <p className="text-center text-base font-semibold">
          {error.message ?? 'Något gick fel.'}
          <br />
        </p>
      </div>
    )
  }

  return (
    <div className="mt-2 flex flex-row items-center justify-center">
      Något gick tyvärr fel.
    </div>
  )
}
