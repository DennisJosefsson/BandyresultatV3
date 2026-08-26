import { createFileRoute } from '@tanstack/react-router'
import GamesList from '../-components/Games/GamesList'
import { getCupGames } from '../-functions/getCupGames'

export const Route = createFileRoute(
  '/_layout/seasons/$year/cup/$competitionName/games',
)({
  loaderDeps: ({ search: { women } }) => ({ women }),
  loader: async ({
    params: { competitionName },
    deps: { women },
    context: { seasonYear },
  }) => {
    const data = await getCupGames({
      data: { seasonYear, women, competitionName },
    })

    if (!data) throw new Error('Missing cup game data')
    return { data }
  },

  staticData: { breadcrumb: 'Matcher' },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData({
    select(match) {
      if (!match) {
        console.error('cup game data undefined')
        throw new Error('cup game data')
      }
      return match.data
    },
  })

  if (data.status === 404) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <span className="text-xs sm:text-sm">
          {data.message}
        </span>
      </div>
    )
  }

  return (
    <div className="@container mx-1 flex flex-col gap-2 @sm:gap-4">
      <div className="flex gap-4 @5xl:grid @5xl:grid-cols-2 mt-2 flex-col">
        {data.playedLength > 0 ? (
          <GamesList
            gamesArray={data.played}
            title="Spelade"
          />
        ) : (
          <div className="flex flex-row">
            <span className="text-sm">
              Inga spelade matcher.
            </span>
          </div>
        )}

        {data.unplayedLength > 0 ? (
          <GamesList
            gamesArray={data.unplayed}
            title="Kommande"
          />
        ) : (
          <div className="flex flex-row">
            <span className="text-sm">
              Alla matcher är spelade.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
