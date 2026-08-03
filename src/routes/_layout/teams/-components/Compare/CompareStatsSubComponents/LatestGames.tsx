import { getRouteApi } from '@tanstack/react-router'
import StatsCard from './StatsCard'
import CompareWinsCard from './CompareWinsCard'
const route = getRouteApi('/_layout/teams/compare')

const LatestGames = () => {
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404 || data.latestGames.length === 0) return null

  return (
    <StatsCard>
      <StatsCard.Title>Senaste matcherna</StatsCard.Title>
      <StatsCard.Content>
        {data.latestGames.map((stat) => (
          <CompareWinsCard stat={stat} key={stat.gameId} />
        ))}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestGames
