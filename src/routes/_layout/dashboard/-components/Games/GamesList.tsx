import { InlineEditGame } from '@/lib/types/game'
import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import GamesListItem from './GamesListItem'

type GamesListProps = {
  games: InlineEditGame[]
}

type GameEdit =
  | { editGame: null }
  | { editGame: 'result'; gameId: number }
  | { editGame: 'date'; gameId: number }

const GamesList = ({ games }: GamesListProps) => {
  const [edit, setEdit] = useState<GameEdit>({ editGame: null })
  return (
    <div className="mt-4 ml-4">
      {games.map((game) => {
        return (
          <GamesListItem
            game={game}
            key={game.gameId.toString()}
            edit={edit}
            setEdit={setEdit}
          />
        )
      })}
      <Outlet />
    </div>
  )
}

export default GamesList
