import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonTableSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex min-h-screen w-full flex-col">
      <div className="xs:mb-3 mb-2 sm:mb-4 lg:mb-6">
        <div className="flex flex-row justify-center mb-2">
          <Skeleton className="w-45 h-9" />
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-row justify-center gap-4">
            <Skeleton className="w-15 h-7" />
            <Skeleton className="w-15 h-7" />
            <Skeleton className="w-15 h-7" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="mb-1 h-7 w-32" />
      </div>

      <div>
        <Skeleton className="mb-1 h-10 w-full" />
        {Array.from({ length: 42 }).map((_i, index) => {
          return (
            <Skeleton
              key={index}
              className="mb-1 h-9 w-full"
            />
          )
        })}
      </div>
    </div>
  )
}

export default SeasonTableSkeleton
