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
    <div className="mb-2 @3xl:mb-4 max-w-70 @2xl:max-w-105 border shadow-xs md:shadow-sm">
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
