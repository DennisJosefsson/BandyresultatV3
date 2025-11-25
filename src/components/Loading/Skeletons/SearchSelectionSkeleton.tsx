import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SearchSelectionSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 m-2">
      <Card>
        <CardHeader>
          <CardTitle>Matchkategorier</CardTitle>
          <CardDescription>Välj minst en kategori.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16">
            {Array.from({ length: 6 }).map((_i, index) => {
              return <Skeleton key={index} className="h-4 w-full" />
            })}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Första säsong</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-[280px]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sista säsong</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-[280px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SearchSelectionSkeleton
