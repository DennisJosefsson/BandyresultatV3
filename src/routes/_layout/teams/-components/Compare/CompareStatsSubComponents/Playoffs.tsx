import { getRouteApi } from '@tanstack/react-router'
import CompareStatsCard from './CompareStatsCard'
import StatsCard from './StatsCard'
const route = getRouteApi('/_layout/teams/compare')
const Playoffs = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404)
    return null
  return (
    <div>
      {data.allPlayoffs.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>Slutspel</StatsCard.Title>
          <StatsCard.Content>
            {data.allPlayoffs.map((stat) => {
              return (
                <CompareStatsCard
                  stat={stat}
                  key={stat.teamId}
                />
              )
            })}
          </StatsCard.Content>
        </StatsCard>
      ) : null}

      {!women && data.playoffs.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>
            Slutspel sedan 1931
          </StatsCard.Title>

          <StatsCard.Content>
            {data.playoffs.map((stat) => {
              return (
                <CompareStatsCard
                  stat={stat}
                  key={stat.teamId}
                />
              )
            })}
          </StatsCard.Content>
        </StatsCard>
      ) : null}
    </div>
  )
}

export default Playoffs
