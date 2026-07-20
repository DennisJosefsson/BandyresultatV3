import { getRouteApi } from '@tanstack/react-router'
import CompareWinsCard from './CompareWinsCard'
import StatsCard from './StatsCard'

const route = getRouteApi('/_layout/teams/compare')

const FirstGames = () => {
  const data = route.useLoaderData()

  if (
    data.status === 400 ||
    data.status === 404 ||
    data.firstGames.length === 0
  )
    return null

  return (
    <StatsCard>
      <StatsCard.Title>Första matcherna</StatsCard.Title>

      <StatsCard.Content>
        {data.firstGames.map((stat) => (
          <CompareWinsCard
            stat={stat}
            key={stat.gameId}
          />
        ))}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default FirstGames
