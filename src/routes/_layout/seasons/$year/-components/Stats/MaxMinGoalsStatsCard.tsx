import Date from '@/components/Common/Date'
import { MaxMinGoals } from '@/lib/types/stats'

type MaxMinGoalsStatsCardProps = {
  maxMinGoals: MaxMinGoals[]
  title: string
}

const MaxMinGoalsStatsCard = ({
  maxMinGoals,
  title,
}: MaxMinGoalsStatsCardProps) => {
  return (
    <div>
      <h6 className="text-xs font-semibold sm:text-sm">{title}</h6>

      <div>
        {maxMinGoals.map((game, index) => {
          return (
            <div
              key={`${index}-${Math.random()}`}
              className="bg-muted mb-2 flex flex-col gap-1 rounded-md p-2"
            >
              <div className="flex flex-row justify-between">
                <div className="text-xs sm:text-sm">
                  {game.home.name}-{game.away.name}
                </div>
                <div className="text-xs sm:text-sm">{game.result}</div>
              </div>
              <div className="flex flex-row">
                <div className="text-xs sm:text-sm">
                  <Date>{game.date}</Date>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MaxMinGoalsStatsCard
