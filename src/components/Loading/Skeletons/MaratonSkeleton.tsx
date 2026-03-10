import { Skeleton } from '@/components/base/ui/skeleton'

const MaratonSkeleton = () => {
  return (
    <div className="w-full">
      <div className="font-inter text-foreground mx-auto mt-4 flex min-h-screen flex-col">
        {Array.from({ length: 42 }).map((_i, index) => {
          return (
            <Skeleton
              key={index}
              className="mb-1 h-6 w-full md:h-9"
            />
          )
        })}
      </div>
    </div>
  )
}

export default MaratonSkeleton
