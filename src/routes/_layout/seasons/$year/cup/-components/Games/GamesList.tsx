import { GameCard } from '@/components/Common/Games/GameCard'
import type { games } from '@/db/schema'
import type { TeamBase } from '@/lib/types/team'

type GameListProps = {
  gamesArray: Array<
    typeof games.$inferSelect & {
      home: TeamBase
    } & { away: TeamBase } & {
      serie: { serieId: number; serieName: string }
    }
  >
  title: string
}

const GamesList = ({
  gamesArray,
  title,
}: GameListProps) => {
  if (gamesArray.length === 0) {
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
      <h4 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
        {title}
      </h4>
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
