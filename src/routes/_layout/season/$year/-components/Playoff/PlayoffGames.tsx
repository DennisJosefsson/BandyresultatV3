import { getRouteApi } from '@tanstack/react-router'
import Games from './Games'

const route = getRouteApi('/_layout/season/$year/playoff/games')

const PlayoffGames = () => {
  const data = route.useLoaderData()

  return (
    <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-1 xl:mx-0">
      {data.games.playedLength > 0 ? (
        <Games games={data.games.played} title="Spelade" />
      ) : null}
      {data.games.unplayedLength > 0 ? (
        <Games games={data.games.unplayed} title="Kommande" />
      ) : null}
    </div>
  )
}

export default PlayoffGames
