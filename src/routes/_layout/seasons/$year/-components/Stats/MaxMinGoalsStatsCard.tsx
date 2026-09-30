import { Datum } from '@/components/Common/Date'
import TeamLogo from '@/components/Common/TeamLogo'
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
                  <div className="flex flex-row gap-2 items-center">
                    <TeamLogo
                      logoId={game.home.logo.logoId}
                      hasDark={game.home.logo.hasDark}
                      size={32}
                      className="size-[1lh] object-scale-down"
                    />
                    <span>{game.home.name}</span>
                  </div>
                </StatsCard.Content>
                <StatsCard.Content>
                  {game.result}
                </StatsCard.Content>
              </StatsCard.Upper>
              <StatsCard.Lower>
                <StatsCard.Content>
                  <div className="flex flex-row gap-2 items-center">
                    <TeamLogo
                      logoId={game.away.logo.logoId}
                      hasDark={game.away.logo.hasDark}
                      size={32}
                      className="size-[1lh] object-scale-down"
                    />
                    <span>{game.away.name}</span>
                  </div>
                </StatsCard.Content>
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
