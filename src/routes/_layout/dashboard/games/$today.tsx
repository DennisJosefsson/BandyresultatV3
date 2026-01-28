import { zd } from '@/lib/utils/zod'
import { createFileRoute } from '@tanstack/react-router'
import GamesList from '../-components/GamesList'
import { getUnplayedGames } from '../-functions/GameFunctions.ts/getUnplayedGames'

export const Route = createFileRoute('/_layout/dashboard/games/$today')({
  params: {
    parse: (params) => ({
      today: zd.enum(['true','false']).parse(params.today),
    }),
    stringify: ({ today }) => ({ today: `${today}` }),
  },
  loader: async ({ params }) => {
    const games = await getUnplayedGames({ data: { today: params.today } })
    if (!games) throw new Error('Data saknas')

    return games
  },
  component: RouteComponent,
})

function RouteComponent() {
  const games = Route.useLoaderData()

  if (games.length === 0) {
    return (
      <div className="mt-10 flex flex-row justify-center">
        <span>Inga matcher som saknar resultat.</span>
      </div>
    )
  }
  return (
    <div>
      <GamesList games={games} />
    </div>
  )
}
