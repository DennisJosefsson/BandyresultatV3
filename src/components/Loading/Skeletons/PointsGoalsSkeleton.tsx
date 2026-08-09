import { Skeleton } from '@/components/base/ui/skeleton'
import {
  H2,
  H3,
} from '@/routes/_layout/maraton/-components/Records/Headers'

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

function PointsGoalsSkeletonFrame() {
  return (
    <div className="mb-2 @3xl:mb-4 max-w-70 @2xl:max-w-90 @7xl:max-w-105  border shadow-xs md:shadow-sm">
      {Array.from({ length: 10 }).map((_i, index) => {
        return <PointsGoalsSkeletonItem key={index} />
      })}
    </div>
  )
}

function PointsGoalsSkeletonItem() {
  return (
    <Skeleton className="mb-1 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6 flex w-full flex-row items-center justify-between p-1 md:p-2 border-b border-accent last:border-none h-8 @sm:h-10 @2xl:h-12 @3xl:h-16" />
  )
}
