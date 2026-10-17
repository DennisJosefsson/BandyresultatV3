import type { GeneralStatItemV2 } from '@/lib/types/records'
import GeneralStatsCard from './GeneralStatsCard'

type RenderGeneralStatsCardProps = {
  array: Array<GeneralStatItemV2>
  stat: string
}

const RenderGeneralStatsCard = ({
  array,
  stat,
}: RenderGeneralStatsCardProps) => {
  return (
    <div className="mb-2 @3xl:mb-4 border shadow-xs md:shadow-sm">
      {array.map((item) => {
        return (
          <GeneralStatsCard
            key={`${item.team.name}-${item.data}-${stat}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

export default RenderGeneralStatsCard
