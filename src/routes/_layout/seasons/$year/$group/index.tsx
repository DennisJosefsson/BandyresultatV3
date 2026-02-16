import {
  createFileRoute,
  notFound,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router'
import {
  CalendarIcon,
  ChartLineIcon,
  ChevronsLeftRightEllipsisIcon,
  FolderKanbanIcon,
  ListIcon,
  MapIcon,
  TrophyIcon,
} from 'lucide-react'
import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { validateGroup } from '../-functions/validateGroup'

export const Route = createFileRoute('/_layout/seasons/$year/$group/')({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({ params: { year, group }, deps: { women } }) => {
    const result = await validateGroup({ data: { year, group, women } })
    if (result.status === 404)
      throw notFound({
        data: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
      })
    return result
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
  const matches = useChildMatches()

  if (matches.length === 0) {
    return (
      <div className="m-4">
        <SectionMenu />
      </div>
    )
  }
  return <Outlet />
}

function SectionMenu() {
  // const group = Route.useParams({select:s=>s.group})
  // const year = Route.useParams({select:s=>s.year})
  const women = Route.useSearch({ select: (s) => s.women })
  const serieName = Route.useLoaderData({ select: (s) => s.serieName })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center">
        <h3 className="text-base font-semibold">{serieName}</h3>
      </div>
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-2 gap-16 xl:grid-cols-6">
          <Route.Link to="/seasons/$year/$group/games" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <CalendarIcon />
              </span>
              <span className="font-semibold">Matcher</span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/tables/$table"
            params={{ table: 'all' }}
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <ListIcon />
              </span>
              <span className="font-semibold">Matcher</span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/development"
            search={{ women, index: 0 }}
          >
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <ChartLineIcon />
              </span>
              <span className="font-semibold">Utveckling</span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/interval"
            search={{ women, start: 0 }}
          >
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <ChevronsLeftRightEllipsisIcon />
              </span>
              <span className="font-semibold">Intervall</span>
            </div>
          </Route.Link>
          <Route.Link to="/seasons/$year/$group/stats" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <FolderKanbanIcon />
              </span>
              <span className="font-semibold">Statistik</span>
            </div>
          </Route.Link>
          <Route.Link to="/seasons/$year/$group/map" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <MapIcon />
              </span>
              <span className="font-semibold">Karta</span>
            </div>
          </Route.Link>
        </div>
        <div className="grid grid-cols-2 gap-16 xl:grid-cols-4">
          <Route.Link to="/seasons/$year/playoff/table" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <TrophyIcon />
              </span>
              <span className="font-semibold">Slutspelsträd</span>
            </div>
          </Route.Link>
          <Route.Link to="/seasons/$year/playoff/games" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <CalendarIcon />
              </span>
              <span className="font-semibold">Slutspelsmatcher</span>
            </div>
          </Route.Link>
          <Route.Link to="/seasons/$year/playoff/stats" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <FolderKanbanIcon />
              </span>
              <span className="font-semibold">Slutspelsstatistik</span>
            </div>
          </Route.Link>
          <Route.Link to="/seasons/$year/playoff/map" search={{ women }}>
            <div className="flex w-full flex-row items-center justify-center gap-8 border px-4 py-2">
              <span>
                <MapIcon />
              </span>
              <span className="font-semibold">Slutspelskarta</span>
            </div>
          </Route.Link>
        </div>
      </div>
    </div>
  )
}
