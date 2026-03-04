import { Skeleton } from '@/components/ui/skeleton'

const IntervalSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex min-h-screen w-full flex-col">
      <div className="flex flex-row justify-between">
        <Skeleton className="mb-1 h-8 w-24" />

        <Skeleton className="mb-1 h-8 w-24" />

        <Skeleton className="mb-1 h-8 w-24" />
      </div>

      <div>
        {Array.from({ length: 15 }).map((_i, index) => {
          return <Skeleton key={index} className="mb-1 h-9 w-full" />
        })}
      </div>
    </div>
  )
}

export default IntervalSkeleton
