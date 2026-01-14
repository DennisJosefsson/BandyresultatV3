import { Game, GameGroupBase } from '@/lib/types/game'
import GamesList from './GamesList'

type GamesProps = {
  games: GameGroupBase<Omit<Game, 'season'>[]>[]
  title: string
}

const Games = ({ games, title }: GamesProps) => {
  return (
    <div>
      <h1 className="text-sm font-bold md:text-base xl:text-lg 2xl:text-xl">
        {title}
      </h1>
      <div className="w-full xl:px-2">
        <GamesList gamesArray={games} />
      </div>
    </div>
  )
}

export default Games
