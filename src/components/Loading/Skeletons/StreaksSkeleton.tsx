import { Skeleton } from '@/components/ui/skeleton'

const StreaksSkeleton = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            <div className="mb-1">
              <Skeleton className="w-32 h-8" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="h-12 w-full mb-1" />
              })}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="w-32 h-8" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="h-12 w-full mb-1" />
              })}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="w-32 h-8" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="h-12 w-full mb-1" />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StreaksSkeleton
