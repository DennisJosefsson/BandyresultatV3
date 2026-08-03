import { getRouteApi } from '@tanstack/react-router'
import StatsCard from './StatsCard'
import CompareStatsCard from './CompareStatsCard'
const route = getRouteApi('/_layout/teams/compare')

const Golds = () => {
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404) return null

  if (data.golds.length === 0) return null
  return (
    <StatsCard>
      <StatsCard.Title>SM-Guld</StatsCard.Title>

      <StatsCard.Content>
        {data.golds.map((stat) => {
          return <CompareStatsCard stat={stat} key={stat.teamId} />
        })}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default Golds
