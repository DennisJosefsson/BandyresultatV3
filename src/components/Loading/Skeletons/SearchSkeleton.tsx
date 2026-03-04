import { Skeleton } from '@/components/ui/skeleton'

const SearchSkeleton = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen w-full">
      <Skeleton className="h-[72px] w-full" />
    </div>
  )
}

export default SearchSkeleton
