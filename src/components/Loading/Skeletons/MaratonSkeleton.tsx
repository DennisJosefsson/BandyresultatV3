import { Skeleton } from '@/components/ui/skeleton'

const MaratonSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mx-auto mt-4 flex min-h-screen flex-col font-inter text-foreground">
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="h-6 md:h-9 w-full mb-1" />
        })}
      </div>
    </div>
  )
}

export default MaratonSkeleton
