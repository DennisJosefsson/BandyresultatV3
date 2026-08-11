import { Skeleton } from '@/components/base/ui/skeleton'

const IntervalSkeleton = () => {
  return (
    <div className="mx-1 flex flex-col sm:mx-4">
      <div className="flex flex-row justify-between">
        <Skeleton className="mb-1 h-8 w-24" />

        <Skeleton className="mb-1 h-8 w-24" />

        <Skeleton className="mb-1 h-8 w-24" />
      </div>

      <div>
        <Skeleton className="mb-1 h-6 w-full" />
        <Skeleton className="mb-1 h-10 w-full" />
        {Array.from({ length: 15 }).map((_i, index) => {
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

export default IntervalSkeleton
