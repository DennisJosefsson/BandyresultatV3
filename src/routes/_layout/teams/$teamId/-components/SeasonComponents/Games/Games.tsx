import type { SeriesGamesV2 } from '@/lib/types/game'
import GamesList from './GamesList'

type GamesProps = {
  gameObject: {
    played: Array<SeriesGamesV2> | null
    unplayed: Array<SeriesGamesV2> | null
  }
  serieName: string
}

const Games = ({ gameObject, serieName }: GamesProps) => {
  if (!gameObject.played && !gameObject.unplayed) {
    return (
      <div className="flex flex-row justify-center mt-2">
        <span>Serien har inga inlagda matcher.</span>
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
