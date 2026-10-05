import { GameCard } from '@/components/Common/Games/GameCard'
import type { SeriesGamesV2 } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import { getRouteApi } from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from '../../-hooks/useGetFirstAndLastSeason'
type GameListProps = {
  games: Array<SeriesGamesV2>
  title: string
  serie: Serie
}

const route = getRouteApi(
  '/_layout/seasons/$year/$group/games',
)

const GamesList = ({
  games,
  title,
  serie,
}: GameListProps) => {
  const { lastSeason } = useGetFirstAndLastSeason()
  const year = route.useParams({ select: (p) => p.year })
  if (games.length === 0 && year === lastSeason) {
    if (title === 'Kommande') {
      return (
        <div className="font-inter mb-6 w-full">
          <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
            {title}
          </h4>
          <span className="text-sm mt-2">
            Alla matcher är spelade.
          </span>
        </div>
      )
    }
    return (
      <div className="font-inter mb-6 w-full">
        <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {title}
        </h4>
        <span className="text-sm mt-2">
          Inga spelade matcher.
        </span>
      </div>
    )
  }
  return (
    <div className="font-inter mb-6 w-full">
      {year === lastSeason ? (
        <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {title}
        </h4>
      ) : null}

      <div>
        {games.map((game) => {
          return (
            <GameCard
              key={`${game.homeTeamId}-${game.awayTeamId}-${game.date}`}
              game={game}
              serieName={serie.serieName}
              routePath="/seasons/$year/$group/games"
            />
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
