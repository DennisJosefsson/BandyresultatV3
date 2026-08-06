import { Datum } from '@/components/Common/Date'
import type { MaxMinGoals } from '@/lib/types/stats'
import StatsCard from './StatsCard'

type MaxMinGoalsStatsCardProps = {
  maxMinGoals: Array<MaxMinGoals>
  title: string
}

const MaxMinGoalsStatsCard = ({
  maxMinGoals,
  title,
}: MaxMinGoalsStatsCardProps) => {
  return (
    <div className="mb-6">
      <h6 className="mb-2 text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm xl:text-base font-semibold">
        {title}
      </h6>

      <div>
        {maxMinGoals.map((game, index) => {
          return (
            <StatsCard key={`${index}-${Math.random()}`}>
              <StatsCard.Upper>
                <StatsCard.Content>
                  {game.home.name}-{game.away.name}
                </StatsCard.Content>
                <StatsCard.Content>
                  {game.result}
                </StatsCard.Content>
              </StatsCard.Upper>
              <StatsCard.Lower>
                <StatsCard.Content>
                  <Datum>{game.date}</Datum>
                </StatsCard.Content>
              </StatsCard.Lower>
            </StatsCard>
          )
        })}
      </div>
    </div>
  )
}

export default MaxMinGoalsStatsCard
