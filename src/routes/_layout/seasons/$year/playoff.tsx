import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import {
  CatchBoundary,
  Outlet,
  createFileRoute,
  useChildMatches,
} from '@tanstack/react-router'
import {
  CalendarIcon,
  FolderKanbanIcon,
  MapIcon,
  TrophyIcon,
} from 'lucide-react'
import PlayoffMenubar from './-components/Menubar/PlayoffMenubar'

export const Route = createFileRoute(
  '/_layout/seasons/$year/playoff',
)({
  beforeLoad: () => {
    return { sidebarSection: 'playoff' }
  },
  staticData: { breadcrumb: 'Slutspel' },
  head: () => ({
    meta: [
      {
        title: 'Bandyresultat - Slutspel',
      },
    ],
  }),
  component: RouteComponent,
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
          id="playoff"
          error={error}
          reset={reset}
        />
      )}
    >
      <Playoff />
    </CatchBoundary>
  )
}

function Playoff() {
  const women = Route.useSearch({ select: (s) => s.women })

  const childMatches = useChildMatches()
  if (childMatches.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            Välj sida
          </h3>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-8 xl:grid-cols-4 xl:gap-16 mx-auto">
          <Route.Link
            to="/seasons/$year/playoff/table"
            search={{ women }}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <TrophyIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Slutspelsträd
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/games"
            search={{ women }}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <CalendarIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Slutspelsmatcher
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/stats"
            search={{ women }}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <FolderKanbanIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Slutspelsstatistik
              </span>
            </div>
          </Route.Link>
          <Route.Link
            to="/seasons/$year/playoff/map"
            search={{ women }}
          >
            <div className="grid grid-cols-2 xs:flex flex-row items-center justify-center gap-2 xs:gap-4 border px-4 py-2 shadow-xs sm:gap-8 md:shadow-sm w-50 xs:w-full">
              <span className="justify-self-end">
                <MapIcon className="size-3 sm:size-4" />
              </span>
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm justify-self-start">
                Slutspelskarta
              </span>
            </div>
          </Route.Link>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <PlayoffMenubar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
