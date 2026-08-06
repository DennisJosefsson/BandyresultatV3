import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import {
  CatchBoundary,
  Navigate,
  createFileRoute,
} from '@tanstack/react-router'
import CompareHeader from './-components/Compare/CompareHeader'
import FirstGames from './-components/Compare/CompareStatsSubComponents/FirstGames'
import Golds from './-components/Compare/CompareStatsSubComponents/Golds'
import LatestGames from './-components/Compare/CompareStatsSubComponents/LatestGames'
import LatestWins from './-components/Compare/CompareStatsSubComponents/LatestWins'
import Playoffs from './-components/Compare/CompareStatsSubComponents/Playoffs'
import Seasons from './-components/Compare/CompareStatsSubComponents/Seasons'
import CompareTables from './-components/Compare/Tables/Table'
import { getCompareTeams } from './-functions/compare'

export const Route = createFileRoute(
  '/_layout/teams/compare',
)({
  loaderDeps: ({ search: searchDeps }) => searchDeps,
  loader: async ({ deps }) => {
    const data = await getCompareTeams({ data: deps })
    if (!data) throw new Error('Missing data')

    return data
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
          loaderData?.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
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
  const data = Route.useLoaderData()

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
    <CatchBoundary
      getResetKey={() => 'reset'}
      onCatch={(error) => {
        console.error(error)
      }}
      errorComponent={({ error, reset }) => (
        <SimpleErrorComponent
          id="compare"
          error={error}
          reset={reset}
        />
      )}
    >
      <Compare />
    </CatchBoundary>
  )
}

function Compare() {
  const data = Route.useLoaderData()
  if (data.status === 400 || data.status === 404) {
    return null
  }

  return (
    <div className="mt-2">
      <CompareHeader />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-4 mt-2 sm:mt-4">
        <CompareTables />
        <div className="flex flex-col gap-2 xl:gap-4 xl:mt-13">
          <Seasons />
          <Playoffs />
          <Golds />
        </div>
        <div className="flex flex-col gap-2">
          <LatestWins
            latestWins={data.latestHomeWin}
            title="Senaste hemmavinsten"
          />
          <LatestWins
            latestWins={data.latestAwayWin}
            title="Senaste bortavinsten"
          />
        </div>
        <div className="flex flex-col gap-2 xl:gap-4">
          <FirstGames />
          <LatestGames />
        </div>
      </div>
    </div>
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
