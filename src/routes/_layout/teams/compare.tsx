import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import AllData from './-components/Compare/AllData'
import CompareHeader from './-components/Compare/CompareHeader'
import CompareStats from './-components/Compare/CompareStats'
import DetailedData from './-components/Compare/DetailedData'
import TeamsList from './-components/TeamsList/TeamsList'
import { compareTeams } from './-functions/compare'

export const Route = createFileRoute('/_layout/teams/compare')({
  loaderDeps: ({ search: searchDeps }) => searchDeps,
  loader: async ({ deps }) => {
    const data = await compareTeams({ data: deps })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  pendingComponent: () => <Loading page="compare" />,

  staticData: {
    breadcrumb: (match) => {
      if (match.loaderData.breadCrumb === undefined) return 'H2H'
      else return match.loaderData.breadCrumb
    },
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title ?? 'Bandyresultat - H2H: Fel',
      },
      {
        name: 'description',
        content: loaderData?.meta.description ?? 'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:description',
        content: loaderData?.meta.description ?? 'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:title',
        content: loaderData?.meta.title ?? 'Bandyresultat - H2H: Fel',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ?? 'https://bandyresultat.se/teams/compare',
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
        <SimpleErrorComponent id="compare" error={error} reset={reset} />
      )}
    >
      <Compare />
    </CatchBoundary>
  )
}

function Compare() {
  const data = Route.useLoaderData()
  if (data.status === 400) {
    return (
      <div className="font-inter mt-2 flex flex-row items-center justify-center">
        <p className="text-center text-base font-semibold">
          {data.message ?? 'Något gick fel.'}
          <br />
        </p>
      </div>
    )
  }
  return (
    <div className="mt-2">
      <CompareHeader />
      <div>
        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables" className="text-[10px] md:text-sm">
              Tabeller
            </TabsTrigger>
            <TabsTrigger value="games" className="text-[10px] md:text-sm">
              Matcher
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-[10px] md:text-sm">
              Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <AllData />
            <DetailedData />
          </TabsContent>

          <CompareStats />
        </Tabs>
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

;<TeamsList />
