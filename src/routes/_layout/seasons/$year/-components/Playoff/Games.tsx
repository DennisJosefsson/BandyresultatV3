import type { Game, GameGroupBase } from '@/lib/types/game'
import GamesList from './Games/GamesList'

type GamesProps = {
  games: Array<GameGroupBase<Array<Omit<Game, 'season'>>>>
  title: string
}

const Games = ({ games, title }: GamesProps) => {
  return (
    <div>
      <h1 className="text-primary text-xs font-semibold tracking-wider @md/playoff:text-sm @xl/playoff:text-base">
        {title}
      </h1>
      <div className="w-full xl:px-2">
        <GamesList gamesArray={games} />
      </div>
    </div>
  )
}

export default Games
