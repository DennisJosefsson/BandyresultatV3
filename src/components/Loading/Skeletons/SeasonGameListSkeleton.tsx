import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonGameListSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex min-h-screen w-full flex-col">
      <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-1 xl:mx-0">
        <div>
          <h1 className="text-sm font-bold md:text-base">
            Spelade
          </h1>
          <Skeleton className="mb-1 h-9 w-32" />
          {Array.from({ length: 42 }).map((_i, index) => {
            return (
              <Skeleton
                key={index}
                className="mb-1 h-9 w-full"
              />
            )
          })}
        </div>
        <div>
          <h1 className="text-sm font-bold md:text-base">
            Kommande
          </h1>
          <Skeleton className="mb-1 h-9 w-32" />
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
    </div>
  )
}

export default SeasonGameListSkeleton
