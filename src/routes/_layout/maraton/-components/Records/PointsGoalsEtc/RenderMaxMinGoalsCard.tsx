import { MaxMinGoalGames } from '@/lib/types/records'
import MaxMinGoalsCard from './MaxMinGoalsCard'

type RenderMaxMinGoalsCardProps = {
  array: MaxMinGoalGames[]
  stat: string
}

const RenderMaxMinGoalsCard = ({ array, stat }: RenderMaxMinGoalsCardProps) => {
  return (
    <div>
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
