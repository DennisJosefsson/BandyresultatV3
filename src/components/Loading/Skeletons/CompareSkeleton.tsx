import { Skeleton } from '@/components/base/ui/skeleton'

const CompareSkeleton = () => {
  return (
    <div className="mt-2 @container/compare">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mt-2 sm:mt-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-30" />
          <Skeleton className="h-5 w-40" />
          <div className="flex flex-col gap-2 border p-1 h-23 sm:w-120 xl:w-full xl:max-w-160">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className=" sm:w-120 xl:w-full xl:max-w-160">
            <div>
              <Skeleton className="w-30 h-12 mb-2" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 border p-1 h-23">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex flex-col gap-2 border p-1 h-23">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex flex-col gap-2 border p-1 h-23">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  sm:w-120 xl:w-full xl:max-w-160  @5xl:mt-16">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex flex-col gap-4 sm:w-120 xl:w-full xl:max-w-160">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

export default CompareSkeleton
