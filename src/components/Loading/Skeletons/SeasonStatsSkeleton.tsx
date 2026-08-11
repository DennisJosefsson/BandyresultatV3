import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonStatsSkeleton = () => {
  return (
    <div className="@container/stats">
      <div className="grid grid-cols-1 gap-y-6 @xl/stats:grid-cols-2 @xl/stats:gap-y-10 @xl/stats:gap-x-2 @3xl/stats:gap-x-10 @5xl:gap-x-20 p-1">
        <Card className="h-105 w-full">
          <CardHeader>
            <Skeleton className="h-10 w-40" />
          </CardHeader>
          <CardContent className="w-full h-full">
            <Skeleton className="w-full h-full" />
          </CardContent>
        </Card>
        <Card className="h-105 w-full">
          <CardHeader>
            <Skeleton className="h-10 w-40" />
          </CardHeader>
          <CardContent className="w-full h-full">
            <Skeleton className="w-full h-full" />
          </CardContent>
        </Card>
        <div>
          {Array.from({ length: 4 }).map((_i, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-1"
              >
                <Skeleton className="h-5 w-40" />
                <Skeleton className="mb-1 h-22 w-full" />
              </div>
            )
          })}
        </div>
        <div>
          {Array.from({ length: 4 }).map((_i, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-1"
              >
                <Skeleton className="h-5 w-40" />
                <Skeleton className="mb-1 h-22 w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonStatsSkeleton
