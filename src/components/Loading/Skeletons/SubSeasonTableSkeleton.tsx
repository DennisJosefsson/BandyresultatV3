import { Skeleton } from '@/components/ui/skeleton'

const SubSeasonTableSkeleton = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col font-inter text-foreground">
      <div>
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          <Skeleton className="h-9 w-32 mb-1" />
        </h2>
      </div>

      <div>
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="h-9 w-full mb-1" />
        })}
      </div>
    </div>
  )
}

export default SubSeasonTableSkeleton
