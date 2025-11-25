import { Skeleton } from '@/components/ui/skeleton'

const SeasonDevelopmentSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col pt-2 font-inter text-foreground w-full">
      <div className="w-60 self-center xxs:w-80 xs:w-[60%] sm:w-96 md:w-2xl h-20 mb-2">
        <Skeleton className="w-full h-[72px]" />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
        <div>
          <div>
            <Skeleton className="h-9 w-32 mb-1" />
          </div>
          <Skeleton className="h-9 w-full mb-1" />
          <Skeleton className="h-9 w-full mb-1" />
        </div>
        <div className="mt-8">
          {Array.from({ length: 14 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonDevelopmentSkeleton
