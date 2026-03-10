import {
  Card,
  CardContent,
} from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonListSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto mb-2 min-h-screen w-full px-1">
      <Card>
        <CardContent>
          <div className="flex flex-col">
            <div className="w-full">
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="grid grid-cols-1 justify-between gap-x-8 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 42 }).map(
                (_i, index) => {
                  return (
                    <Skeleton
                      key={index}
                      className="h-9 w-full"
                    />
                  )
                },
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SeasonListSkeleton
