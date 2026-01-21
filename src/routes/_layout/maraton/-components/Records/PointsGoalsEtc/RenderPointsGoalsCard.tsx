import { RecordData } from '@/lib/types/records'
import PointsGoalsCard from './PointsGoalsCard'

type RenderPointsGoalsCardProps = {
  array: RecordData[]
  stat: string
}

const RenderPointsGoalsCard = ({ array, stat }: RenderPointsGoalsCardProps) => {
  return (
    <div>
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
