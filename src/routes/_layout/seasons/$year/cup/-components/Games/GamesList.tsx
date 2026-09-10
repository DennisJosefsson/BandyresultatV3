import { GameCard } from '@/components/Common/Games/GameCard'
import type { Game } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from '../../../-hooks/useGetFirstAndLastSeason'

const route = getRouteApi(
  '/_layout/seasons/$year/cup/$competitionName/games',
)

type GameListProps = {
  gamesArray: Array<
    Omit<Game, 'season'> & {
      serie: { serieId: number; serieName: string }
    }
  >
  title: string
}

const GamesList = ({
  gamesArray,
  title,
}: GameListProps) => {
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
    <div className="font-inter mb-6 w-full">
      {year === lastSeason ? (
        <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {title}
        </h4>
      ) : null}
      <div className="mb-4 w-full @container/cupgames">
        {gamesArray.map((game) => {
          return (
            <GameCard
              key={game.gameId}
              game={game}
              serieName={game.serie.serieName}
              routePath="/seasons/$year/cup/$competitionName/games"
            />
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
