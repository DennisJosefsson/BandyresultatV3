import AddSingleGameForm from '@/routes/_layout/dashboard/-components/Forms/GameForms/AddSingleGameForm'
import { getSerieDataForSingleGame } from '@/routes/_layout/dashboard/-functions/GameFunctions.ts/getSerieDataForSingleGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/singlegame',
)({
  loader: async ({ params: { serieId } }) => {
    const data = await getSerieDataForSingleGame({ data: { serieId } })
    if (!data) throw new Error('Missing data')

    return data
  },
  component: AddSingleGameForm,
})
