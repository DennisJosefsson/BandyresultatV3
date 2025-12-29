import { getRouteApi } from '@tanstack/react-router'
import GamesList from './Games/GamesList'

const route = getRouteApi('/_layout/season/$year/$group/games')

export const SeasonGames = () => {
  const games = route.useLoaderData({ select: (s) => s.games })

  if (games.playedLength + games.unplayedLength === 0) {
    return (
      <div className="mt-2 flex flex-row justify-center font-semibold">
        Inga matcher än denna säsong.
      </div>
    )
  }

  return (
    <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-1 xl:mx-0">
      {games['playedLength'] > 0 ? (
        <GamesList group={games.played} title="Spelade" />
      ) : null}
      {games['unplayedLength'] > 0 ? (
        <GamesList group={games.unplayed} title="Kommande" />
      ) : null}
    </div>
  )
}
