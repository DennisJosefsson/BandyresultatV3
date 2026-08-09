import { Skeleton } from '@/components/base/ui/skeleton'
import { H2 } from '@/routes/_layout/maraton/-components/Records/Headers'
import PointsGoalsSkeleton from './PointsGoalsSkeleton'
import { PointsGoalsSkeletonFrame } from './recordStatSkeletons'

const ScoredSkeleton = () => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="grid-cols-1 grid gap-2 @3xl:grid-cols-2">
        <div className="max-w-xl">
          <H2>Elitseriematcher med flest antal mål</H2>
          <PointsGoalsSkeletonFrame />
          <div className="my-2 max-w-xl p-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
            <Skeleton className="h-6" />
          </div>
        </div>
        <div className="max-w-xl">
          <H2>Elitseriematcher med minst antal mål</H2>
          <PointsGoalsSkeletonFrame />
          <div className="my-2 max-w-xl p-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
            <Skeleton className="h-6" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <PointsGoalsSkeleton />
      </div>
    </div>
  )
}

export default ScoredSkeleton
