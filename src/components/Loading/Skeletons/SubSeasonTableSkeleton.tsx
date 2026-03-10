import { Skeleton } from '@/components/base/ui/skeleton'

const SubSeasonTableSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex min-h-screen w-full flex-col">
      <div>
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          <Skeleton className="mb-1 h-9 w-32" />
        </h2>
      </div>

      <div>
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
  )
}

export default SubSeasonTableSkeleton
