import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonDevelopmentSkeleton = () => {
  return (
    <div className="@container/dev font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <div className="flex flex-row justify-center mb-2">
        <Skeleton className="h-15 w-full max-w-200" />
      </div>

      <div className="grid grid-cols-1 gap-2 @5xl/dev:grid-cols-7 @5xl/dev:gap-4">
        <div className="@5xl/dev:col-span-3">
          <Skeleton className="h-7 w-30 mb-1" />
          {Array.from({ length: 7 }).map((_i, index) => {
            return (
              <Skeleton
                key={index}
                className="mb-1 h-9 w-full"
              />
            )
          })}
        </div>
        <div className="hidden @md/dev:block @5xl/dev:col-span-4 @5xl/dev:mt-6">
          <div className="mt-2">
            {Array.from({ length: 14 }).map((_i, index) => {
              return (
                <Skeleton
                  key={index}
                  className="mb-1 h-9 w-full"
                />
              )
            })}
          </div>
          <div className="@md/dev:hidden">
            {Array.from({ length: 14 }).map((_i, index) => {
              return (
                <Skeleton
                  key={index}
                  className="mb-1 h-9 w-full"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonDevelopmentSkeleton
