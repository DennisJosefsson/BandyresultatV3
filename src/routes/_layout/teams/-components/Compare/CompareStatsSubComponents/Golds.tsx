import type { CompareSeasonStat } from '@/lib/types/compare'
import CompareStatsCard from './CompareStatsCard'
import StatsCard from './StatsCard'

type CompareGoldProps = {
  golds: Array<CompareSeasonStat>
}

const Golds = ({ golds }: CompareGoldProps) => {
  if (golds.length === 0) return null
  return (
    <StatsCard>
      <StatsCard.Title>SM-Guld</StatsCard.Title>

      <StatsCard.Content>
        {golds.map((stat) => {
          return (
            <CompareStatsCard
              stat={stat}
              key={stat.teamId}
            />
          )
        })}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default Golds
