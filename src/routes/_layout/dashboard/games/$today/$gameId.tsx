import { createFileRoute, Outlet } from '@tanstack/react-router'
import z from 'zod'
import { getSingleGame } from '../../-functions/GameFunctions/getSingleGame'

export const Route = createFileRoute('/_layout/dashboard/games/$today/$gameId')(
  {
    params: {
      parse: (params) => ({
        gameId: z.number().int().parse(Number(params.gameId)),
      }),
      stringify: ({ gameId }) => ({ gameId: `${gameId}` }),
    },
    loader: async ({ params }) => {
      const game = await getSingleGame({ data: { gameId: params.gameId } })
      if (!game) throw new Error('Matchdata saknas')
      return game
    },
    component: () => <Outlet />,
  },
)
