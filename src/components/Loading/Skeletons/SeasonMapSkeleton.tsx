import { Skeleton } from '@/components/ui/skeleton'

const SeasonMapSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="xs:max-w-[360px] h-[400px] w-screen max-w-[280px] p-2 sm:max-w-xl" />
    </div>
  )
}

export default SeasonMapSkeleton
