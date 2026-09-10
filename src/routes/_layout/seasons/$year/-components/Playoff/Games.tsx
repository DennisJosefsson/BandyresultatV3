import type { Game, GameGroupBase } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from '../../-hooks/useGetFirstAndLastSeason'
import GamesList from './Games/GamesList'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/games',
)

type GamesProps = {
  gamesArray: Array<
    GameGroupBase<Array<Omit<Game, 'season'>>>
  >
  title: string
}

const Games = ({ gamesArray, title }: GamesProps) => {
  const { lastSeason } = useGetFirstAndLastSeason()
  const year = route.useParams({ select: (p) => p.year })

  if (gamesArray.length === 0 && year === lastSeason) {
    {
      return (
        <div className="font-inter mb-6 w-full">
          <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
            {title}
          </h4>
          <span className="text-sm mt-2">
            {title === 'Kommande'
              ? 'Alla matcher är spelade.'
              : ' Inga spelade matcher.'}
          </span>
        </div>
      )
    }
  }
  return (
    <div>
      {year === lastSeason ? (
        <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {title}
        </h4>
      ) : null}
      <div className="w-full xl:px-2">
        <GamesList gamesArray={gamesArray} />
      </div>
    </div>
  )
}

export default Games
