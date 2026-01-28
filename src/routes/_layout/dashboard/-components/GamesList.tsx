import { Game } from '@/lib/types/game'
import { Outlet } from '@tanstack/react-router'
import GamesListItem from './GamesListItem'

type GamesListProps = {
  games: Omit<Game, 'season'>[]
}

const GamesList = ({ games }: GamesListProps) => {
  return (
    <div className="mt-4 ml-4">
      {games.map((game) => {
        return <GamesListItem game={game} key={game.gameId.toString()} />
      })}
      <Outlet />
    </div>
  )
}

export default GamesList
