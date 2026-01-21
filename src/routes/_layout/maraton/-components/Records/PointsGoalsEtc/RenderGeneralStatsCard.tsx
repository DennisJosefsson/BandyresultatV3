import { GeneralStatItem } from '@/lib/types/records'
import GeneralStatsCard from './GeneralStatsCard'

type RenderGeneralStatsCardProps = {
  array: GeneralStatItem[]
  stat: string
}

const RenderGeneralStatsCard = ({
  array,
  stat,
}: RenderGeneralStatsCardProps) => {
  return (
    <div>
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
