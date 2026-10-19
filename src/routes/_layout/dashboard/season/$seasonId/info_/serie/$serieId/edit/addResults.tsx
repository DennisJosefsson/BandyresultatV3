import BulkResults from '@/routes/_layout/dashboard/-components/Games/BulkResults'
import { generateSchedule } from '@/routes/_layout/dashboard/-functions/GameFunctions/generateSchedule'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/serie/$serieId/edit/addResults',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await generateSchedule({
      data: { serieId },
    })
    if (!data) {
      throw new Error('Missing data in loader')
    }

    return data.games
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mt-2 flex flex-col min-h-100">
      <BulkResults />
    </div>
  )
}
