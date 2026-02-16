import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { zd } from '@/lib/utils/zod'
import {
  CatchBoundary,
  createFileRoute,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import { getGroups } from './$year/-functions/getGroups'

const yearParser = zd.object({
  year: zd.number().int().min(1907),
})

export const Route = createFileRoute('/_layout/seasons/$year')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  params: {
    parse: (params) => ({
      year: zd.number().int().min(1907).parse(Number(params.year)),
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
  staticData: { breadcrumb: (match) => match.loaderData.breadCrumb },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.meta.title,
      },
      {
        name: 'description',
        content: loaderData?.meta.description,
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
  component: Season,
  notFoundComponent: NotFound,
  pendingComponent: () => <Loading page="singleSeason" />,
})

function Season() {
  const childMatches = useChildMatches()
  if (childMatches.length === 0) {
    return (
      <div className="m-4 flex flex-col gap-4">
        <div className="flex flex-row justify-center">
          <h3 className="text-base font-semibold">Välj grupp</h3>
        </div>
        <GroupList />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
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

function GroupList() {
  const data = Route.useLoaderData()
  const year = Route.useParams({ select: (s) => s.year })
  const women = Route.useSearch({ select: (s) => s.women })
  if (data.status === 204) return null

  return (
    <div className="grid grid-cols-2 gap-16 xl:grid-cols-6">
      {data.groups.map((group) => {
        return (
          <Route.Link
            key={group.serieId.toString()}
            to="/seasons/$year/$group"
            params={{ group: group.group, year: year }}
            search={{ women: women }}
          >
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span className="font-semibold">{group.name}</span>
            </div>
          </Route.Link>
        )
      })}
    </div>
  )
}
