import { GameCard } from '@/components/Common/Games/GameCard'
import type { TeamSeasonGame } from '@/lib/types/game'

type GameListProps = {
  gamesArray: Array<TeamSeasonGame>
  serieName: string
}

const GamesList = ({
  gamesArray,
  serieName,
}: GameListProps) => {
  if (gamesArray.length === 0) {
    return null
  }
  return (
    <div className="font-inter mt-2 mb-6 lg:mt-3 2xl:mt-4">
      <div>
        {gamesArray.map((game) => {
          return (
            <div
              key={game.gameId.toString()}
              className="w-full @container/teamseasongames"
            >
              <div className="w-full">
                <GameCard
                  key={game.gameId}
                  game={game}
                  serieName={serieName}
                  routePath="/teams/$teamId/seasons/$seasonId/"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GamesList
