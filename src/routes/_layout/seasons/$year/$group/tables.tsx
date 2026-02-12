import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/seasons/$year/$group/tables')({
  component: Tables,
})

function Tables() {
  const { year } = Route.useParams()

  if (year < 1930) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Inga serietabeller för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div>
      {/* <SeasonTablesButtonList /> */}
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent
            id="Säsongstabell"
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
