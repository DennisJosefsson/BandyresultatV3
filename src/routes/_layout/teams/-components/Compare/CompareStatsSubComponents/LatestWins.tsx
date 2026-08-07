import { Datum } from '@/components/Common/Date'
import type { CompareLatestWinStats } from '@/lib/types/compare'
import StatsCard from './StatsCard'

type LatestWinsProps = {
  latestWins: Array<CompareLatestWinStats>
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
        {latestWins.map((game) => {
          return (
            <div
              key={game.gameId}
              className="bg-muted-foreground/20 mb-4 last:mb-1 flex w-full flex-col rounded px-3 py-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6"
            >
              <div className="mb-0.5 flex flex-col">
                <span className="font-semibold">
                  <Datum>{game.date}</Datum>
                </span>
              </div>

              <div className="flex flex-row justify-between">
                <div>
                  {game.homeName}-{game.awayName}
                </div>
                <div className="tabular-nums">
                  {game.result}
                </div>
              </div>
              <div>
                <span>{game.age}</span>
              </div>
            </div>
          )
        })}
      </StatsCard.Content>
    </StatsCard>
  )
}

export default LatestWins
