import { GameCard } from '@/components/Common/Games/GameCard'
import type { games } from '@/db/schema'
import type { Serie } from '@/lib/types/serie'
import type { TeamBase } from '@/lib/types/team'

type CupGames = {
  serie: Serie
  games: Array<
    typeof games.$inferSelect & {
      home: TeamBase
    } & { away: TeamBase }
  >
}

type GameListProps = {
  gamesArray: Array<CupGames>
  title: string
}

const GamesList = ({
  gamesArray,
  title,
}: GameListProps) => {
  if (gamesArray.length === 0) {
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
      <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
        {title}
      </h4>
      <div>
        {gamesArray.map((serie) => {
          if (serie.games.length === 0) return null
          return (
            <div
              key={serie.serie.group}
              className="mb-4 w-full @container/cupgames"
            >
              <div className="w-full">
                {serie.games.map((game) => {
                  return (
                    <GameCard
                      key={game.gameId}
                      game={game}
                      serieName={serie.serie.serieName}
                      routePath="/seasons/$year/cup/$competitionName/games"
                    />
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
