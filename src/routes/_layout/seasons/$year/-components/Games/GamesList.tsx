import { GameCard } from '@/components/Common/Games/GameCard'
import type { Game, GameGroupBase } from '@/lib/types/game'
type GameListProps = {
  group: GameGroupBase<Array<Omit<Game, 'season'>>>
  title: string
}

const GamesList = ({ group, title }: GameListProps) => {
  if (group.dates.length === 0) return null
  return (
    <div className="font-inter mb-6 w-full">
      <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
        {title}
      </h4>

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
