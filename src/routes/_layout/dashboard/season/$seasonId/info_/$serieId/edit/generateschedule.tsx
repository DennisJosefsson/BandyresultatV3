import GenerateSchedule from '@/routes/_layout/dashboard/-components/Games/GenerateSchedule'
import { generateSchedule } from '@/routes/_layout/dashboard/-functions/GameFunctions.ts/generateSchedule'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/generateschedule',
)({
  loader: async ({ params: { serieId } }) => {
    const games = await generateSchedule({ data: { serieId } })
    if (!games) throw new Error('Missing games')
    return games
  },
  component: GenerateSchedule,
})
