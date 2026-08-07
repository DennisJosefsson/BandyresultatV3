import type { MaxMinGoalGames } from '@/lib/types/records'
import MaxMinGoalsCard from './MaxMinGoalsCard'

type RenderMaxMinGoalsCardProps = {
  array: Array<MaxMinGoalGames>
  stat: string
}

const RenderMaxMinGoalsCard = ({
  array,
  stat,
}: RenderMaxMinGoalsCardProps) => {
  return (
    <div className="mb-2 @3xl:mb-4 max-w-70 @2xl:max-w-90 @7xl:max-w-105  border shadow-xs md:shadow-sm">
      {array.map((item) => {
        return (
          <MaxMinGoalsCard
            key={`${item.teams}-${item.result}-${stat}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

export default RenderMaxMinGoalsCard
