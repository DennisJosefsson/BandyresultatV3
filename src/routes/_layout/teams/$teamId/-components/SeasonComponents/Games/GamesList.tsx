import type { GroupGames } from '@/lib/types/game'
import { GamesCard } from './GameCard'

type GameListProps = {
  gamesArray: Array<GroupGames>
}

const GamesList = ({ gamesArray }: GameListProps) => {
  if (gamesArray.length === 0) {
    return null
  }
  return (
    <div className="font-inter mt-2 mb-6 max-w-3xl lg:mt-3 2xl:mt-4">
      <div>
        {gamesArray.map((group) => {
          return (
            <div
              key={group.group}
              className="mb-6 w-full @container/teamseasongames"
            >
              <div className="ml-2 w-full table-fixed md:ml-4">
                {group.comment && (
                  <span>{group.comment}</span>
                )}

                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.games.map((game) => {
                        return (
                          <GamesCard
                            key={game.gameId}
                            game={game}
                            serieName={group.name}
                          />
                        )
                      })}
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
