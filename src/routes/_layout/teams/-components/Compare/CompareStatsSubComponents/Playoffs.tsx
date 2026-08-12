import type { CompareSeasonStat } from '@/lib/types/compare'
import { getRouteApi } from '@tanstack/react-router'
import CompareStatsCard from './CompareStatsCard'
import StatsCard from './StatsCard'
const route = getRouteApi('/_layout/teams/compare')

type ComparePlayoffProps = {
  playoffs: Array<CompareSeasonStat>
  allPlayoffs: Array<CompareSeasonStat>
}

const Playoffs = ({
  playoffs,
  allPlayoffs,
}: ComparePlayoffProps) => {
  const women = route.useSearch({
    select(state) {
      return state.women
    },
  })
  return (
    <div className="flex flex-col gap-2">
      {allPlayoffs.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>Slutspel</StatsCard.Title>
          <StatsCard.Content>
            {allPlayoffs.map((stat) => {
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

      {!women && playoffs.length > 0 ? (
        <StatsCard>
          <StatsCard.Title>
            Slutspel sedan 1931
          </StatsCard.Title>

          <StatsCard.Content>
            {playoffs.map((stat) => {
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
