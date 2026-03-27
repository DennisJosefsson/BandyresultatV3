import { getRouteApi } from '@tanstack/react-router'

import FinalCard from './FinalCard'
import NilFinalComponent from './NilFinalComponent'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const Final = () => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.finalGames) return null

  if (data.finalGames.length === 0)
    return <NilFinalComponent />

  return (
    <>
      {data.finalGames.map((game) => {
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
