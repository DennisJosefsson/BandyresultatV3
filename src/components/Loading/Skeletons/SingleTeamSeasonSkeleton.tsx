import { Button } from '@/components/base/ui/button'
import { Skeleton } from '@/components/base/ui/skeleton'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

const SingleTeamSeasonSkeleton = () => {
  return (
    <div className="@container flex flex-col gap-2 mt-2 sm:mt-4">
      <div className="flex flex-row items-center justify-center gap-10">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Gå till föregående säsong"
        >
          <ArrowLeftIcon className="size-3 lg:size-6" />
          <span className="sr-only">Tidigare säsong</span>
        </Button>

        <span className="w-24 text-center text-sm font-semibold md:text-base">
          <Skeleton className="h-7 w-full" />
        </span>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Gå till nästa säsong"
        >
          <ArrowRightIcon className="size-3 lg:size-6" />
          <span className="sr-only">Senare säsong</span>
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="mb-1 h-6 w-25" />
        <Skeleton className="mb-1 h-10 w-full" />
        {Array.from({ length: 14 }).map((_i, index) => {
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

export default SingleTeamSeasonSkeleton
