import type { GeneralStatItem } from '@/lib/types/records'
import GeneralStatsCard from './GeneralStatsCard'

type RenderGeneralStatsCardProps = {
  array: Array<GeneralStatItem>
  stat: string
}

const RenderGeneralStatsCard = ({
  array,
  stat,
}: RenderGeneralStatsCardProps) => {
  return (
    <div className="border shadow-md max-w-90">
      {array.map((item) => {
        return (
          <GeneralStatsCard
            key={`${item.team.name}-${item.count}-${stat}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

export default RenderGeneralStatsCard
