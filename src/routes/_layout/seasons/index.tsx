import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import SeasonsList from './-components/SeasonsList'
import SeasonsPagination from './-components/SeasonsPagination'
import { getPaginatedSeasons, page } from './-functions/getPaginatedSeasons'

export const Route = createFileRoute('/_layout/seasons/')({
  validateSearch: z.object({ page }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps }) => {
    const seasons = await getPaginatedSeasons({ data: deps.page })
    return seasons
  },
  component: Seasons,
})

function Seasons() {
  return (
    <div className="font-inter text-foreground mx-auto mb-2 min-h-screen w-full px-1">
      <div>
        <CatchBoundary
          getResetKey={() => 'reset'}
          onCatch={(error) => {
            console.error(error)
          }}
          errorComponent={({ error, reset }) => (
            <SimpleErrorComponent
              id="Säsongslista"
              error={error}
              reset={reset}
            />
          )}
        >
          <SeasonsPagination />
          <div className="self-center">
            <SeasonsList />
          </div>
          <div className="sm:hidden">
            <SeasonsPagination />
          </div>
        </CatchBoundary>
      </div>
    </div>
  )
}
