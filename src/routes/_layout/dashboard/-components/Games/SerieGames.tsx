import { getRouteApi, Outlet } from '@tanstack/react-router'
import SerieGamesList from './SerieGamesList'

const route = getRouteApi(
  '/_layout/dashboard/season/$seasonId/info_/$serieId/edit/games',
)

const SerieGames = () => {
  const playedGames = route.useLoaderData({ select: (s) => s.playedGames })
  const unplayedGames = route.useLoaderData({ select: (s) => s.unplayedGames })

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-x-20">
        <div>
          <SerieGamesList games={playedGames} title="Spelade" />
        </div>
        <div>
          <SerieGamesList games={unplayedGames} title="Kommande" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default SerieGames
