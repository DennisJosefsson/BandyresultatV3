import {
  CatchBoundary,
  Outlet,
  createFileRoute,
  notFound,
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

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'

import GroupListForErrorComponent from '../-components/GroupListForErrorComponent'
import { validateGroup } from '../-functions/validateGroup'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group/',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { year, group },
    deps: { women },
  }) => {
    const data = await validateGroup({
      data: { year, group, women },
    })

    if (!data)
      throw new Error('Missing groupValidation data')

    if (data.status === 404)
      throw notFound({
        data: `Ingen ${women ? 'dam' : 'herr'}serie med detta namn det här året. Välj en ny i listan.`,
      })
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
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.meta.title ??
          'Bandyresultat - Sektioner',
      },
      {
        name: 'description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Sektioner',
      },
      {
        property: 'og:description',
        content:
          loaderData?.meta.description ??
          'Bandyresultat - Sektioner',
      },
      {
        property: 'og:title',
        content:
          loaderData?.meta.title ??
          'Bandyresultat - Sektioner',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content:
          loaderData?.meta.url ??
          'https://www.bandyresultat.se',
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
        <SimpleErrorComponent
          id="groupIndexRoute"
          error={error}
          reset={reset}
        />
      )}
    >
      <IndexRoute />
    </CatchBoundary>
  )
}

function IndexRoute() {
  const matches = useChildMatches()

  if (matches.length === 0) {
    return (
      <div>
        <SectionMenu />
      </div>
    )
  }
  return <Outlet />
}

function SectionMenu() {
  const women = Route.useSearch({ select: (s) => s.women })
  const serieName = Route.useLoaderData({
    select: (s) => s.serieName,
  })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-center">
        <h3 className="text-xs sm:text-sm xl:text-base font-semibold">
          {serieName}
        </h3>
      </div>
      <div className="flex flex-col gap-4 sm:gap-10 2xl:gap-16">
        <div className="grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-3 xl:gap-x-16 xl:gap-y-8 2xl:grid-cols-6">
          <Route.Link
            to="/seasons/$year/$group/games"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <CalendarIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Matcher
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/tables/$table"
            params={{ table: 'all' }}
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <ListIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Tabeller
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/development"
            search={{ women, index: 0 }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <ChartLineIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Utveckling
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/interval"
            search={{ women, start: 0 }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <ChevronsLeftRightEllipsisIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Intervall
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/stats"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <FolderKanbanIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Statistik
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/$group/map"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <MapIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Karta
              </span>
            </div>
          </Route.Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-8 xl:gap-16 xl:grid-cols-4">
          <Route.Link
            to="/seasons/$year/playoff/table"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <TrophyIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Slutspelsträd
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/games"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <CalendarIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Slutspelsmatcher
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/stats"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <FolderKanbanIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Slutspelsstatistik
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/map"
            search={{ women }}
          >
            <div className="flex w-full flex-row items-center gap-4 sm:gap-8 border px-4 py-2">
              <span>
                <MapIcon className="size-3 sm:size-4" />
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                Slutspelskarta
              </span>
            </div>
          </Route.Link>
        </div>
      </div>
    </div>
  )
}
