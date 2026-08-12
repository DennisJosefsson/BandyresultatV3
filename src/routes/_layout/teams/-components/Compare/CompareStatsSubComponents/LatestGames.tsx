import type { CompareGameStat } from '@/lib/types/compare'
import CompareWinsCard from './CompareWinsCard'
import StatsCard from './StatsCard'

type CompareLatestGamesProps = {
  latestGames: Array<CompareGameStat>
}

const LatestGames = ({
  latestGames,
}: CompareLatestGamesProps) => {
  if (latestGames.length === 0) return null

  return (
    <StatsCard>
      <StatsCard.Title>Senaste matcherna</StatsCard.Title>
      <StatsCard.Content>
        {latestGames.map((stat) => (
          <CompareWinsCard
            stat={stat}
            key={stat.gameId}
          />
        ))}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestGames
