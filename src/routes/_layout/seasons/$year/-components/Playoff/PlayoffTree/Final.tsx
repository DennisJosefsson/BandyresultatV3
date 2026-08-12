import type { Game } from '@/lib/types/game'
import FinalCard from './FinalCard'
import NilFinalComponent from './NilFinalComponent'

type FinalGameProps = {
  finalGames: Array<Omit<Game, 'season'>>
}

const Final = ({ finalGames }: FinalGameProps) => {
  if (finalGames.length === 0) return <NilFinalComponent />

  return (
    <>
      {finalGames.map((game) => {
        return (
          <FinalCard
            key={game.gameId}
            game={game}
          />
        )
      })}
    </>
  )
}

export default Final
