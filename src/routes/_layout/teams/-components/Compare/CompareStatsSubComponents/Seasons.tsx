import type { CompareSeasonStat } from '@/lib/types/compare'
import { getRouteApi } from '@tanstack/react-router'
import CompareStatsCard from './CompareStatsCard'
import StatsCard from './StatsCard'
const route = getRouteApi('/_layout/teams/compare')

type CompareSeasonProps = {
  firstDivisionSeasonsSince1931: Array<CompareSeasonStat>
  firstDivisionSeasons: Array<CompareSeasonStat>
}

const Seasons = ({
  firstDivisionSeasons,
  firstDivisionSeasonsSince1931,
}: CompareSeasonProps) => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })

  return (
    <div className="flex flex-col gap-2">
      {firstDivisionSeasons.length > 1 ? (
        <StatsCard>
          <StatsCard.Title>
            Säsonger i högsta serien
          </StatsCard.Title>

          <StatsCard.Content>
            {firstDivisionSeasons.map((stat) => {
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
      firstDivisionSeasonsSince1931.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>
            Säsonger i högsta serien sedan 1931
          </StatsCard.Title>

          <StatsCard.Content>
            {firstDivisionSeasonsSince1931.map((stat) => {
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

export default Seasons
