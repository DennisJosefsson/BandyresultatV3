import {
  CatchBoundary,
  Outlet,
  createFileRoute,
} from '@tanstack/react-router'

import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { validateGroup } from './-functions/validateGroup'

export const Route = createFileRoute(
  '/_layout/seasons/$year/$group',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { year, group },
    deps: { women },
  }) => {
    const data = await validateGroup({
      data: { year, group, women },
    })

    return data
  },
  staticData: {
    breadcrumb: (match) => {
      return match.loaderData.breadCrumb ?? 'Serie'
    },
  },
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
          id="groupRoute"
          error={error}
          reset={reset}
        />
      )}
    >
      <Outlet />
    </CatchBoundary>
  )
}
