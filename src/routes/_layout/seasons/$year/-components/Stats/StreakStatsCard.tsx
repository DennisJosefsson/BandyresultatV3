import Date from '@/components/Common/Date'
import { StreakData } from '@/lib/types/stats'

type StreakStatsCard = {
  streak: StreakData[]
  title: string
}

const StreakStatsCard = ({ streak, title }: StreakStatsCard) => {
  return (
    <div>
      <h6 className="text-xs font-semibold sm:text-sm">{title}</h6>

      {streak?.map((team, index) => {
        return (
          <div
            key={`${team.name}-${team.gameCount}-${
              team.startDate
            }-${Math.random()}-${index}`}
            className="bg-secondary mb-2 flex flex-col gap-1 rounded-md p-2"
          >
            <div className="flex flex-row justify-between">
              <div className="text-xs sm:text-sm">{team.name}</div>
              <div className="text-xs sm:text-sm">{team.gameCount}</div>
            </div>
            <div className="flex flex-row">
              <div className="text-xs sm:text-sm">
                <Date>{team.startDate}</Date> - <Date>{team.endDate}</Date>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StreakStatsCard
