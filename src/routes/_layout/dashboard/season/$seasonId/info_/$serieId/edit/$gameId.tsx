import { zd } from '@/lib/utils/zod'
import EditGameForm from '@/routes/_layout/dashboard/-components/Forms/GameForms/EditGameForm'
import { getSingleGame } from '@/routes/_layout/dashboard/-functions/GameFunctions/getSingleGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/$gameId',
)({
  params: {
      parse: ({ gameId }) => ({ gameId: zd.coerce.number().parse(gameId) }),
      stringify: ({ gameId }) => ({ gameId: `${gameId}` }),
    },
    loader: async ({ params: { gameId } }) => {
      const game = await getSingleGame({ data: { gameId } })
  
      if (!game) throw new Error('Missing data')
  
      return game
    },
    component: EditGameForm
})


