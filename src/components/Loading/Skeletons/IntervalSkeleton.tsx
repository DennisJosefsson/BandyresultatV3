import { Skeleton } from '@/components/ui/skeleton'

const IntervalSkeleton = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <div className="flex flex-row justify-between">
        <Skeleton className="h-8 w-24 mb-1" />

        <Skeleton className="h-8 w-24 mb-1" />

        <Skeleton className="h-8 w-24 mb-1" />
      </div>

      <div>
        {Array.from({ length: 15 }).map((_i, index) => {
          return <Skeleton key={index} className="h-9 w-full mb-1" />
        })}
      </div>
    </div>
  )
}

export default IntervalSkeleton
