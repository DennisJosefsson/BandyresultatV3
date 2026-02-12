import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import Loading from '@/components/Loading/Loading'
import { zd } from '@/lib/utils/zod'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'
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
