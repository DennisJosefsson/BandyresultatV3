import { Skeleton } from '@/components/base/ui/skeleton'

const StreaksSkeleton = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-32" />
            </div>
            <div>
              {Array.from({ length: 10 }).map(
                (_i, index) => {
                  return (
                    <Skeleton
                      key={index}
                      className="mb-1 h-12 w-full"
                    />
                  )
                },
              )}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-32" />
            </div>
            <div>
              {Array.from({ length: 10 }).map(
                (_i, index) => {
                  return (
                    <Skeleton
                      key={index}
                      className="mb-1 h-12 w-full"
                    />
                  )
                },
              )}
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Skeleton className="h-8 w-32" />
            </div>
            <div>
              {Array.from({ length: 10 }).map(
                (_i, index) => {
                  return (
                    <Skeleton
                      key={index}
                      className="mb-1 h-12 w-full"
                    />
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StreaksSkeleton
