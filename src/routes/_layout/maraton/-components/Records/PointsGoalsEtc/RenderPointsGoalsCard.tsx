import type { RecordData } from '@/lib/types/records'
import PointsGoalsCard from './PointsGoalsCard'

type RenderPointsGoalsCardProps = {
  array: Array<RecordData>
  stat: string
}

const RenderPointsGoalsCard = ({
  array,
  stat,
}: RenderPointsGoalsCardProps) => {
  return (
    <div className="mb-2 @3xl:mb-4 border shadow-xs md:shadow-sm">
      {array.map((item) => {
        return (
          <PointsGoalsCard
            key={`${item.team.casualName}-${item.year}-${stat}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

export default RenderPointsGoalsCard
