import { Skeleton } from '@/components/base/ui/skeleton'

const MaratonSkeleton = () => {
  return (
    <div>
      <div className="border p-2 shadow-xs md:shadow-sm">
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
