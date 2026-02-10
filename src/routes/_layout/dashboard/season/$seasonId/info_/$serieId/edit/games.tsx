import SerieGames from '@/routes/_layout/dashboard/-components/Games/SerieGames'
import { getSerieGames } from '@/routes/_layout/dashboard/-functions/GameFunctions/getSerieGames'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSerieGames({ data: { serieId } })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: SerieGames,
})
