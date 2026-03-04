import {
  CatchBoundary,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { clientSearchParams } from '@/lib/types/search'

import { getSearchTeams } from './search/-functions/getSearchTeams'

export const Route = createFileRoute('/_layout/search')({
  staticData: { breadcrumb: 'Sök' },
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
          <SimpleErrorComponent
            id="Sök"
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
