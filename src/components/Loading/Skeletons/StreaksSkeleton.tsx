import { H1 } from '@/routes/_layout/maraton/-components/Records/Headers'
import { PointsGoalsSkeletonFrame } from './recordStatSkeletons'

const StreaksSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <H1>Rekordsviter</H1>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 2xl:gap-10">
        <PointsGoalsSkeletonFrame />
        <PointsGoalsSkeletonFrame />
        <PointsGoalsSkeletonFrame />
        <PointsGoalsSkeletonFrame />
        <PointsGoalsSkeletonFrame />
        <PointsGoalsSkeletonFrame />
      </div>
    </div>
  )
}

export default StreaksSkeleton
