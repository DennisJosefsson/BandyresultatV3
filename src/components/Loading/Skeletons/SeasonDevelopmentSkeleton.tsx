import { Skeleton } from '@/components/ui/skeleton'

const SeasonDevelopmentSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <div className="xxs:w-80 xs:w-[60%] mb-2 h-20 w-60 self-center sm:w-96 md:w-2xl">
        <Skeleton className="h-[72px] w-full" />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
        <div>
          <div>
            <Skeleton className="mb-1 h-9 w-32" />
          </div>
          <Skeleton className="mb-1 h-9 w-full" />
          <Skeleton className="mb-1 h-9 w-full" />
        </div>
        <div className="mt-8">
          {Array.from({ length: 14 }).map((_i, index) => {
            return <Skeleton key={index} className="mb-1 h-9 w-full" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonDevelopmentSkeleton
