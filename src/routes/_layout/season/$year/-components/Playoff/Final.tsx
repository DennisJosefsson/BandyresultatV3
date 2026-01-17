import { getRouteApi } from '@tanstack/react-router'
import FinalCard from './FinalCard'
import NilFinalComponent from './NilFinalComponent'

const route = getRouteApi('/_layout/season/$year/playoff/table')

const Final = () => {
  const finalGames = route.useLoaderData({ select: (s) => s.finalGames })

  if (finalGames.length === 0) return <NilFinalComponent />

  return (
    <>
      {finalGames.map((game) => {
        return <FinalCard key={game.gameId} game={game} />
      })}
    </>
  )
}

export default Final
