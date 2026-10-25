import type { CompareGamesBase } from '@/lib/types/game'
import { CompareGameCard } from '../Games/CompareGameCard'
import StatsCard from './StatsCard'

type CompareFirstGamesProps = {
  firstGames: Array<CompareGamesBase>
}

const FirstGames = ({
  firstGames,
}: CompareFirstGamesProps) => {
  if (firstGames.length === 0) return null

  return (
    <StatsCard>
      <StatsCard.Title>Första matcherna</StatsCard.Title>

      <StatsCard.Content>
        <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mt-2 sm:mt-4">
          {firstGames.map((game) => (
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

export default FirstGames
