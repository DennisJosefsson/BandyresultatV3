import { getRouteApi } from '@tanstack/react-router'

import GamesList from './Games/GamesList'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/games',
)

export const SeasonGames = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  if (
    data.games.playedLength + data.games.unplayedLength ===
    0
  ) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }

  return (
    <div className="mx-1 mt-2 grid grid-cols-1 xl:grid-cols-2 xl:gap-20 xl:mx-0">
      {data.games['playedLength'] > 0 ? (
        <GamesList
          group={data.games.played}
          title="Spelade"
        />
      ) : null}
      {data.games['unplayedLength'] > 0 ? (
        <GamesList
          group={data.games.unplayed}
          title="Kommande"
        />
      ) : null}
    </div>
  )
}
