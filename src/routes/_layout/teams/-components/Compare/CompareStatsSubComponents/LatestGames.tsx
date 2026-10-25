import type { CompareGamesBase } from '@/lib/types/game'
import { CompareGameCard } from '../Games/CompareGameCard'
import StatsCard from './StatsCard'

type CompareLatestGamesProps = {
  latestGames: Array<CompareGamesBase>
}

const LatestGames = ({
  latestGames,
}: CompareLatestGamesProps) => {
  if (latestGames.length === 0) return null

  return (
    <StatsCard>
      <StatsCard.Title>Senaste matcherna</StatsCard.Title>
      <StatsCard.Content>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mt-2 sm:mt-4">
          {latestGames.map((game) => (
            <CompareGameCard
              game={{ type: 'regular', game: game }}
              key={game.gameId}
            />
          ))}
        </div>
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestGames
