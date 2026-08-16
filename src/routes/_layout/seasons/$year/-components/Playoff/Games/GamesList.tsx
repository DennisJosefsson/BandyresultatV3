import { GameCard } from '@/components/Common/Games/GameCard'
import type { Game, GameGroupBase } from '@/lib/types/game'

type GameListProps = {
  gamesArray: Array<
    GameGroupBase<Array<Omit<Game, 'season'>>>
  >
}

const GamesList = ({ gamesArray }: GameListProps) => {
  if (gamesArray.length === 0) return null
  return (
    <div className="font-inter mb-6 w-full">
      <div>
        {gamesArray.map((group) => {
          return (
            <div
              key={group.group}
              className="mb-6"
            >
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.games.map((game) => (
                        <GameCard
                          key={`${game.homeTeamId}-${game.awayTeamId}-${date.date}`}
                          game={game}
                          serieName={group.name}
                          routePath="/seasons/$year/playoff/games"
                        />
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
