import { Skeleton } from '@/components/ui/skeleton'

const TeamListSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full mb-2 h-9" />
      <div className="grid grid-cols-1 justify-start gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="h-9 w-full" />
        })}
      </div>
    </div>
  )
}

export default TeamListSkeleton
