import type { Game } from '@/lib/types/game'
import FinalCard from './FinalCard'
import NilFinalComponent from './NilFinalComponent'

type FinalGameProps = {
  finalGames: Array<Omit<Game, 'season'>>
  title: string
}

const Final = ({ finalGames, title }: FinalGameProps) => {
  if (finalGames.length === 0)
    return <NilFinalComponent title={title} />

  return (
    <>
      {finalGames.map((game) => {
        return (
          <FinalCard
            key={game.gameId}
            game={game}
            title={title}
          />
        )
      })}
    </>
  )
}

export default Final
