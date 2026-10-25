import type { CompareGamesWithAge } from '@/lib/types/game'
import { CompareGameCard } from '../Games/CompareGameCard'
import StatsCard from './StatsCard'

type LatestWinsProps = {
  latestWins: Array<CompareGamesWithAge>
  title: string
}

const LatestWins = ({
  latestWins,
  title,
}: LatestWinsProps) => {
  if (latestWins.length === 0) return null
  return (
    <StatsCard>
      <StatsCard.Title>{title}</StatsCard.Title>
      <StatsCard.Content>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mt-2 sm:mt-4">
          {latestWins.map((game) => {
            return (
              <CompareGameCard
                game={{ type: 'latest', game: game }}
                key={game.gameId}
              />
            )
          })}
        </div>
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestWins
