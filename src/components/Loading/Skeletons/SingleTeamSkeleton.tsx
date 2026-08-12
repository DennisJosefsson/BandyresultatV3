import { Skeleton } from '@/components/base/ui/skeleton'

const SingleTeamSkeleton = () => {
  return (
    <div className="font-inter text-foreground mt-2 flex min-h-screen w-full flex-col">
      <div className="mb-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="sm:text-md xs:tracking-widest text-sm tracking-wide md:text-lg xl:text-2xl">
                <Skeleton className="h-5 w-30" />
              </span>
              <span className="text-xs md:text-sm xl:text-base">
                <Skeleton className="h-5 w-20" />
              </span>
            </div>

            <div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          <div>
            <Skeleton className="xs:w-16 w-8 object-scale-down md:w-24 lg:w-32 aspect-square"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleTeamSkeleton
