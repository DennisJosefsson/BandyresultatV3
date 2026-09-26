import type { TeamSeasonGame } from '@/lib/types/game'
import GamesList from './GamesList'

type GamesProps = {
  gameObject: {
    played: Array<TeamSeasonGame>
    unplayed: Array<TeamSeasonGame>
  }
  serieName: string
}

const Games = ({ gameObject, serieName }: GamesProps) => {
  if (
    gameObject.played.length +
      gameObject.unplayed.length ===
    0
  ) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Matcher saknas för denna serie.
        </p>
      </div>
    )
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-4">
        <GamesList
          gamesArray={gameObject.played}
          serieName={serieName}
        />
        <GamesList
          gamesArray={gameObject.unplayed}
          serieName={serieName}
        />
      </div>
    </div>
  )
}

export default Games
