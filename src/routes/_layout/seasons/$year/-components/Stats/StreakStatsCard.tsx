import { Datum } from '@/components/Common/Date'
import type { StreakData } from '@/lib/types/stats'
import StatsCard from './StatsCard'

type StreakStatsCard = {
  streak: Array<StreakData>
  title: string
}

const StreakStatsCard = ({
  streak,
  title,
}: StreakStatsCard) => {
  return (
    <div className="mb-6">
      <h6 className="mb-2 text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm xl:text-base font-semibold">
        {title}
      </h6>

      {streak?.map((team, index) => {
        return (
          <StatsCard
            key={`${team.name}-${team.gameCount}-${team.startDate}-${Math.random()}-${index}`}
          >
            <StatsCard.Upper>
              <StatsCard.Content>
                {team.name}
              </StatsCard.Content>
              <StatsCard.Content>
                {team.gameCount}
              </StatsCard.Content>
            </StatsCard.Upper>
            <StatsCard.Lower>
              <StatsCard.Content>
                <Datum>{team.startDate}</Datum> -{' '}
                <Datum>{team.endDate}</Datum>
              </StatsCard.Content>
            </StatsCard.Lower>
          </StatsCard>
        )
      })}
    </div>
  )
}

export default StreakStatsCard
