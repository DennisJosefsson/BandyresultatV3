import type { PlayoffGames } from '@/lib/types/game'
import Games from '../Games'

type PlayoffGamesProps = {
  games: PlayoffGames
}

const PlayoffGames = ({ games }: PlayoffGamesProps) => {
  return (
    <div className="@container/playoff mx-1 flex flex-col gap-2 @sm/playoff:gap-4">
      <div className="flex flex-row gap-x-12 items-center">
        <h3 className="text-primary font-semibold tracking-wider text-sm">
          Slutspel
        </h3>
      </div>
      <div className="flex gap-4 @5xl:grid @5xl:grid-cols-2 mt-2">
        <Games
          gamesArray={games.played}
          title="Spelade"
        />

        <Games
          gamesArray={games.unplayed}
          title="Kommande"
        />
      </div>
    </div>
  )
}

export default PlayoffGames
