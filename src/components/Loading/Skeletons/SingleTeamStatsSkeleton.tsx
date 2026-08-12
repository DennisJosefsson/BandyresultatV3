import { Skeleton } from '@/components/base/ui/skeleton'

const SingleTeamStatsSkeleton = () => {
  return (
    <div className="@container mt-2 sm:mt-4 text-[8px] @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-x-8 gap-y-1 @sm:gap-y-2">
        <div className="h-40">
          <Skeleton className="w-full @2xl:max-w-lg @4xl:max-w-xl h-full" />
        </div>
        <div className="h-40">
          <Skeleton className="w-full @2xl:max-w-lg @4xl:max-w-xl h-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-x-8 gap-y-1 @sm:gap-y-2 mt-2 @5xl:mt-4 @xs:text-[10px] @sm:text-xs @2xl:text-sm/6">
        <div className="flex flex-col">
          {Array.from({ length: 7 }).map((_i, index) => {
            return (
              <Skeleton
                key={index}
                className="mb-1 h-40 w-full @2xl:max-w-lg @4xl:max-w-xl"
              />
            )
          })}
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 7 }).map((_i, index) => {
            return (
              <Skeleton
                key={index}
                className="mb-1 h-40 w-full @2xl:max-w-lg @4xl:max-w-xl"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SingleTeamStatsSkeleton
