import { Skeleton } from '@/components/base/ui/skeleton'
import { PointsGoalsSkeletonFrame } from './recordStatSkeletons'

const GeneralStatsSkeleton = () => {
  return (
    <div className="flex w-full flex-col @5xl:w-4/5 @7xl:w-2/3">
      <div>
        <Skeleton className="h-6 w-40 mb-1" />
      </div>
      <div>
        <div>
          <Skeleton className="h-6 w-40 mb-1" />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-2 @lg:grid-cols-2 @3xl:gap-4 @5xl:gap-6">
          <div>
            <div>
              <Skeleton className="h-6 w-40 mb-1" />
            </div>
            <div>
              <PointsGoalsSkeletonFrame />
            </div>
          </div>

          <div>
            <div>
              <Skeleton className="h-6 w-40 mb-1" />
            </div>
            <div>
              <PointsGoalsSkeletonFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralStatsSkeleton
