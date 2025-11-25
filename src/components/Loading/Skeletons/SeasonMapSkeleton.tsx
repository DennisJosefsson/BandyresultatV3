import { Skeleton } from '@/components/ui/skeleton'

const SeasonMapSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-[400px] w-screen max-w-[280px] p-2 xs:max-w-[360px] sm:max-w-xl" />
    </div>
  )
}

export default SeasonMapSkeleton
