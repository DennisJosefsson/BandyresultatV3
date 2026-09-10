import { GameCard } from '@/components/Common/Games/GameCard'
import type { Game, GameGroupBase } from '@/lib/types/game'
import { getRouteApi } from '@tanstack/react-router'
import { useGetFirstAndLastSeason } from '../../-hooks/useGetFirstAndLastSeason'
type GameListProps = {
  group: GameGroupBase<Array<Omit<Game, 'season'>>>
  title: string
}

const route = getRouteApi(
  '/_layout/seasons/$year/$group/games',
)

const GamesList = ({ group, title }: GameListProps) => {
  const { lastSeason } = useGetFirstAndLastSeason()
  const year = route.useParams({ select: (p) => p.year })
  if (group.dates.length === 0 && year === lastSeason) {
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
        {group.dates.map((date) => {
          const games = date.games

          return (
            <div key={date.date}>
              {games.map((game) => (
                <GameCard
                  key={`${game.homeTeamId}-${game.awayTeamId}-${date.date}`}
                  game={game}
                  serieName={group.name}
                  routePath="/seasons/$year/$group/games"
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
