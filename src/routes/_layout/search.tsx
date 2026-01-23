import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { clientSearchParams } from '@/lib/types/search'
import { CatchBoundary, createFileRoute, Outlet } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { getSearchTeams } from './search/-functions/getSearchTeams'

export const Route = createFileRoute('/_layout/search')({
  validateSearch: zodValidator(clientSearchParams),
  loader: () => getSearchTeams(),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <CatchBoundary
        getResetKey={() => 'reset'}
        onCatch={(error) => {
          console.error(error)
        }}
        errorComponent={({ error, reset }) => (
          <SimpleErrorComponent id="Sök" error={error} reset={reset} />
        )}
      >
        <Outlet />
      </CatchBoundary>
    </div>
  )
}
