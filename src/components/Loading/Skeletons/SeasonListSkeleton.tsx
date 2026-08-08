import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonListSkeleton = () => {
  return (
    <div className="my-2 flex flex-col">
      <div className="mx-auto grid grid-cols-1 gap-y-2 border px-2 py-2 shadow-xs sm:grid-cols-2 sm:gap-x-8 md:shadow-md xl:grid-cols-3 xl:px-4 2xl:gap-x-24">
        {Array.from({ length: 12 }).map((_i, index) => {
          return (
            <div
              key={index}
              className="w-55 sm:w-65 xl:w-70 2xl:w-75"
            >
              <Skeleton className="h-9 w-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeasonListSkeleton
