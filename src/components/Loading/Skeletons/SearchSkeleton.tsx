import { Skeleton } from '@/components/ui/skeleton'

const SearchSkeleton = () => {
  return (
    <div className="mx-auto mt-2 min-h-screen w-full">
      <Skeleton className="w-full h-[72px]" />
    </div>
  )
}

export default SearchSkeleton
