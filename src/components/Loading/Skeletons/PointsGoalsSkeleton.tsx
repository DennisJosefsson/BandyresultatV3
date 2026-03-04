import { Skeleton } from '@/components/ui/skeleton'

const PointsGoalsSkeleton = () => {
  return (
    <>
      <div className="w-full">
        <div className="mb-1">
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-24" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="mb-1 h-12 w-full" />
              })}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-24" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="mb-1 h-12 w-full" />
              })}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-24" />
            </div>
            <div>
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="mb-1 h-12 w-full" />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PointsGoalsSkeleton
