import { Skeleton } from '@/components/ui/skeleton'

const GeneralStatsSkeleton = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen font-inter text-foreground w-full">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2 mb-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="hidden h-8 w-24 lg:block" />
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2">
          {Array.from({ length: 24 }).map((_i, index) => {
            return <Skeleton key={index} className="h-12 w-full" />
          })}
        </div>
      </div>
    </div>
  )
}

export default GeneralStatsSkeleton
