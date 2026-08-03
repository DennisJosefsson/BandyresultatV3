import { getRouteApi } from '@tanstack/react-router'
import CompareStatsCard from './CompareStatsCard'
import StatsCard from './StatsCard'
const route = getRouteApi('/_layout/teams/compare')

const Seasons = () => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  const data = route.useLoaderData()
  if (data.status === 400 || data.status === 404)
    return null
  return (
    <div className="flex flex-col gap-2">
      {data.firstDivisionSeasons.length > 1 ? (
        <StatsCard>
          <StatsCard.Title>
            Säsonger i högsta serien
          </StatsCard.Title>

          <StatsCard.Content>
            {data.firstDivisionSeasons.map((stat) => {
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
      {!women &&
      data.firstDivisionSeasonsSince1931.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>
            Säsonger i högsta serien sedan 1931
          </StatsCard.Title>

          <StatsCard.Content>
            {data.firstDivisionSeasonsSince1931.map(
              (stat) => {
                return (
                  <CompareStatsCard
                    stat={stat}
                    key={stat.teamId}
                  />
                )
              },
            )}
          </StatsCard.Content>
        </StatsCard>
      ) : null}
    </div>
  )
}

export default Seasons
