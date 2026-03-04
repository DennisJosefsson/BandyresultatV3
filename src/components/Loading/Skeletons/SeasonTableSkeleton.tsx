import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const SeasonTableSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex min-h-screen w-full flex-col">
      <div className="my-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
        <Button size="sm" variant="outline">
          Alla
        </Button>

        <Button size="sm" variant="outline">
          Hemma
        </Button>

        <Button size="sm" variant="outline">
          Borta
        </Button>
      </div>
      <div>
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          <Skeleton className="mb-1 h-9 w-32" />
        </h2>
      </div>

      <div>
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="mb-1 h-9 w-full" />
        })}
      </div>
    </div>
  )
}

export default SeasonTableSkeleton
