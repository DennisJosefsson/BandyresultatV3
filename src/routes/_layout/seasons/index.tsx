import SimpleErrorComponent from '@/components/ErrorComponents/SimpleErrorComponent'
import { Card, CardContent } from '@/components/ui/card'
import { db } from '@/db'
import { seasons } from '@/db/schema'
import { CatchBoundary, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import SeasonsList from './-components/SeasonsList'
import SeasonsPagination from './-components/SeasonsPagination'

const page = z.number().catch(1)

const getPaginatedSeasons = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(page))
  .handler(async ({ data }) => {
    const count = await db.$count(seasons, eq(seasons.women, false))

    const pagSeasons = await db.query.seasons.findMany({
      columns: { seasonId: true, year: true },
      where: (seasons, { eq }) => eq(seasons.women, false),
      offset: (data - 1) * 12,
      limit: 12,
      orderBy: (seasons, { desc }) => desc(seasons.seasonId),
    })
    return { count, seasons: pagSeasons }
  })

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
    <div className="mx-auto mb-2 min-h-screen w-full px-1 font-inter text-foreground">
      <Card>
        <CardContent className="mt-2">
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
        </CardContent>
      </Card>
    </div>
  )
}
