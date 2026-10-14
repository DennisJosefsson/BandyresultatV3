import { GameCard } from '@/components/Common/Games/GameCard'
import type { MaxMinGames } from '@/lib/types/stats'

type GamesProps = { games: MaxMinGames }

const Games = ({ games }: GamesProps) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xs sm:text-sm">
          Matcher med flest antal mål
        </h2>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2">
          {games.maxGoalGames.map((game) => {
            return (
              <GameCard
                key={`${game.gameId}-maxGames`}
                game={game}
                serieName={game.serieName}
                routePath="/seasons/$year/stats/"
              />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xs sm:text-sm">
          Matcher med minst antal mål
        </h2>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2">
          {games.minGoalGames.map((game) => {
            return (
              <GameCard
                key={`${game.gameId}-maxGames`}
                game={game}
                serieName={game.serieName}
                routePath="/seasons/$year/stats/"
              />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xs sm:text-sm">
          Matcher med störst målskillnad
        </h2>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-2">
          {games.maxGoalDifferenceGames.map((game) => {
            return (
              <GameCard
                key={`${game.gameId}-maxGames`}
                game={game}
                serieName={game.serieName}
                routePath="/seasons/$year/stats/"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Games
