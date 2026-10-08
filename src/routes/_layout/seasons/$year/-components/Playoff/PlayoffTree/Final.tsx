import type { FinalAndBronze } from '@/lib/types/table'
import FinalCard from './FinalCard'
import NilFinalComponent from './NilFinalComponent'

type FinalGameProps = {
  finalGames: FinalAndBronze | null
  title: string
}

const Final = ({ finalGames, title }: FinalGameProps) => {
  if (finalGames === null) return null
  if (finalGames.games.length === 0)
    return <NilFinalComponent title={title} />

  return (
    <>
      {finalGames.games.map((game) => {
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
