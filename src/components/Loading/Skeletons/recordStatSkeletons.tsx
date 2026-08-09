import { Skeleton } from '@/components/base/ui/skeleton'

export function PointsGoalsSkeletonFrame() {
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
