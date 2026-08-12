import type { CompareGameStat } from '@/lib/types/compare'
import CompareWinsCard from './CompareWinsCard'
import StatsCard from './StatsCard'

type CompareFirstGamesProps = {
  firstGames: Array<CompareGameStat>
}

const FirstGames = ({
  firstGames,
}: CompareFirstGamesProps) => {
  if (firstGames.length === 0) return null

  return (
    <StatsCard>
      <StatsCard.Title>Första matcherna</StatsCard.Title>

      <StatsCard.Content>
        {firstGames.map((stat) => (
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
