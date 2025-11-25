import { Skeleton } from '@/components/ui/skeleton'

const SeasonGameListSkeleton = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <div className="mx-1 mt-2 grid grid-cols-1 lg:grid-cols-2 xl:mx-0 lg:gap-1">
        <div>
          <h1 className="text-sm font-bold md:text-base">Spelade</h1>
          <Skeleton className="h-9 w-32 mb-1" />
          {Array.from({ length: 42 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
        <div>
          <h1 className="text-sm font-bold md:text-base">Kommande</h1>
          <Skeleton className="h-9 w-32 mb-1" />
          {Array.from({ length: 42 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonGameListSkeleton
