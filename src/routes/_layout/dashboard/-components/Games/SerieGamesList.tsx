import ConfirmDialog from '@/components/Common/ConfirmDialog'
import { Game } from '@/lib/types/game'
import { Outlet } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { deleteGameMutation } from '../../-hooks/deleteGameMutation'
import SerieGamesListItem from './SerieGamesListItem'

type SerieGamesListProps = {
  games: Omit<Game, 'season'>[] | undefined
  title: string
}

const SerieGamesList = ({ games, title }: SerieGamesListProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [gameId, setGameId] = useState<number | null>(null)
  const mutation = deleteGameMutation(dialogRef)

  const openDialog = (id: number) => {
    setGameId(id)
    dialogRef.current?.showModal()
  }

  const deleteGameFunction = () => {
    if (!gameId) return
    mutation.mutate({ data: { gameId } })
  }

  if (!games || games.length === 0) {
    return (
      <div className="flex flex-col gap-2 px-4">
        <span className="text-base">{title}</span>
        <div className="flex flex-row justify-center">
          <span className="text-sm">Inga matcher.</span>
        </div>
      </div>
    )
  }
  return (
    <div className="px-4">
      <ConfirmDialog
        dialogRef={dialogRef}
        onClose={() => setGameId(null)}
        confirmFunction={deleteGameFunction}
        confirmButtonText="Ja, ta bort"
        closeButtonText="Nej,stäng"
        confirmTitle="Är du säker på att du vill ta bort matchen?"
      />
      <span className="text-base">{title}</span>
      {games.map((game) => {
        return (
          <SerieGamesListItem
            game={game}
            key={game.gameId.toString()}
            openDialog={openDialog}
          />
        )
      })}
      <Outlet />
    </div>
  )
}

export default SerieGamesList
