import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import SeasonHeader from './$year/-components/SeasonHeader'
import SeasonTabBar from './$year/-components/SeasonTabBar'
import { getGroups } from './$year/-functions/getGroups'

const getMaxYear = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  if (month > 4) return year + 1
  return year
}

const yearParser = zd.object({
  year: zd.number().int().min(1907),
})

export const Route = createFileRoute('/_layout/season/$year')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  params: {
    parse: (params) => ({
      year: zd
        .number()
        .int()
        .min(1907)
        .max(getMaxYear())
        .catch(getMaxYear())
        .parse(Number(params.year)),
    }),
    stringify: ({ year }) => ({
      year: `${year}`,
    }),
  },
  loader: async ({ params, deps }) => {
    const data = await getGroups({
      data: { year: params.year, women: deps.women },
    })

    return data
  },
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: () => <Loading page="singleSeason" />,
})

function Season() {
  const data = Route.useLoaderData()
  const matches = useChildMatches()

  if (data.status === 204) {
    return (
      <div className="font-inter text-foreground flex min-h-screen flex-col px-2">
        <Card className="mb-2">
          <CardContent className="max-w-full">
            <SeasonHeader />
            <SeasonTabBar />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="mt-2 min-h-screen p-2">
            <CatchBoundary
              getResetKey={() => 'reset'}
              onCatch={(error) => {
                console.error(error)
              }}
              errorComponent={({ error, reset }) => (
                <SimpleErrorComponent
                  id="Enskild säsong"
                  error={error}
                  reset={reset}
                />
              )}
            >
              <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
                <p className="mx-10 text-center">
                  Första säsongen för damernas högsta serie var{' '}
                  <Link
                    to={'/season/$year'}
                    params={{ year: 1973 }}
                    search={{ women: true }}
                    className="font-bold"
                  >
                    1972/73
                  </Link>
                  .
                </p>
              </div>
            </CatchBoundary>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (matches.length === 0) {
    return <GroupSelection />
  }

  return (
    <div className="font-inter text-foreground flex min-h-screen flex-col px-2">
      <Card className="mb-2">
        <CardContent className="max-w-full">
          <SeasonHeader />
          <SeasonTabBar />
        </CardContent>
      </Card>
      <ScrollArea
        className="mb-2 h-16 w-full rounded-md border whitespace-nowrap"
        type="auto"
      >
        <div className="flex w-max justify-center space-x-16 p-4">
          {data.groups.map((item) => {
            return (
              <div className="w-full text-nowrap" key={item.group}>
                <Link
                  to="."
                  params={(prev) => ({ ...prev, group: item.group })}
                  search={(prev) => ({ women: prev.women })}
                >
                  {item.name}
                </Link>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Card>
        <CardContent className="mt-2 min-h-screen p-2">
          <CatchBoundary
            getResetKey={() => 'reset'}
            onCatch={(error) => {
              console.error(error)
            }}
            errorComponent={({ error, reset }) => (
              <SimpleErrorComponent
                id="Enskild säsong"
                error={error}
                reset={reset}
              />
            )}
          >
            <Outlet />
          </CatchBoundary>
        </CardContent>
      </Card>
    </div>
  )
}

function NotFound() {
  const year = Route.useParams().year
  const parseYear = yearParser.safeParse(year)
  if (!parseYear.success) {
    return (
      <div className="flex flex-row justify-center">
        Felaktigt säsongsId, kolla om länken är korrekt.
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center">Den länken finns inte.</div>
  )
}

function GroupSelection() {
  const data = Route.useLoaderData()
  if (data.status === 204) {
    return null
  }
  return (
    <>
      <ScrollArea
        className="mb-2 h-16 w-full rounded-md border whitespace-nowrap"
        type="auto"
      >
        <div className="flex w-max justify-center space-x-16 p-4">
          {data.groups.map((item) => {
            return (
              <div className="w-full text-nowrap" key={item.group}>
                <Link
                  from="/season/$year"
                  to="/season/$year/$group"
                  params={(prev) => ({ year: prev.year, group: item.group })}
                  search={(prev) => ({ women: prev.women })}
                >
                  {item.name}
                </Link>
              </div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Card>
        <CardContent className="mt-2 min-h-screen p-2">
          <div className="flex flex-row justify-center">Välj en grupp.</div>
        </CardContent>
      </Card>
    </>
  )
}
