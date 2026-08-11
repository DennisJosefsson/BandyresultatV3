import { Card } from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonMapSkeleton = () => {
  return (
    <Card className="@container/map mx-auto h-[70vh] p-2 sm:w-125 xl:w-150">
      <Skeleton className="h-full w-full" />
    </Card>
  )
}

export default SeasonMapSkeleton
