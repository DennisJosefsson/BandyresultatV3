import Loading from '@/components/Loading/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CompareRequestError from '@/lib/middlewares/errors/CompareRequestError'
import { createFileRoute, Link } from '@tanstack/react-router'
import AllData from './-components/Compare/AllData'
import CompareHeader from './-components/Compare/CompareHeader'
import CompareStats from './-components/Compare/CompareStats'
import DetailedData from './-components/Compare/DetailedData'
import { compareTeams } from './-functions/compare'

export const Route = createFileRoute('/_layout/teams/compare')({
  loaderDeps: ({ search: searchDeps }) => searchDeps,
  loader: async ({ deps }) => compareTeams({ data: deps }),
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  pendingComponent: () => <Loading page="compare" />,
})

function RouteComponent() {
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
  const compareObject = Route.useSearch()

  if (error && error instanceof CompareRequestError) {
    return (
      <div className="font-inter mt-2 flex flex-row items-center justify-center">
        <p className="text-center">
          {error.message ?? 'Något gick fel.'}
          <br />
          Gå till{' '}
          <Link
            to="/teams"
            search={compareObject}
            className="font-semibold text-blue-700 underline"
          >
            laglistan
          </Link>{' '}
          eller ändra{' '}
          <Link
            to="/teams/selection"
            search={compareObject}
            className="font-semibold text-blue-700 underline"
          >
            sökval
          </Link>
          .
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
