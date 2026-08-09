import { Skeleton } from '@/components/base/ui/skeleton'
import {
  H2,
  H3,
} from '@/routes/_layout/maraton/-components/Records/Headers'
import { PointsGoalsSkeletonFrame } from './recordStatSkeletons'

const PointsGoalsSkeleton = () => {
  return (
    <div>
      <div className="mb-2">
        <Skeleton className="w-30 h-7" />
      </div>
      <H2>Högsta</H2>
      <div className="mb-4 grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-x-8 @7xl:grid-cols-3 @7xl:gap-x-12">
        <div className="max-w-xl">
          <H3>Genomsnitt</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Genomsnitt Hemma</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Genomsnitt Borta</H3>
          <PointsGoalsSkeletonFrame />
        </div>
      </div>
      <H2>Lägsta</H2>
      <div className="mb-4 grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-x-8 @7xl:grid-cols-3 @7xl:gap-x-12">
        <div className="max-w-xl">
          <H3>Genomsnitt</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Genomsnitt Hemma</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Genomsnitt Borta</H3>
          <PointsGoalsSkeletonFrame />
        </div>
      </div>
      <H2>Högsta</H2>
      <div className="mb-4 grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-x-8 @7xl:grid-cols-3 @7xl:gap-x-12">
        <div className="max-w-xl">
          <H3>Totalt</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Totalt Hemma</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Totalt Borta</H3>
          <PointsGoalsSkeletonFrame />
        </div>
      </div>
      <H2>Lägsta</H2>
      <div className="mb-4 grid grid-cols-1 gap-2 @3xl:grid-cols-2 @3xl:gap-x-8 @7xl:grid-cols-3 @7xl:gap-x-12">
        <div className="max-w-xl">
          <H3>Totalt</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Totalt Hemma</H3>
          <PointsGoalsSkeletonFrame />
        </div>
        <div className="max-w-xl">
          <H3>Totalt Borta</H3>
          <PointsGoalsSkeletonFrame />
        </div>
      </div>
    </div>
  )
}

export default PointsGoalsSkeleton
