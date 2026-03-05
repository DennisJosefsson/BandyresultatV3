import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
} from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'

const SingleSeasonSkeleton = () => {
  return (
    <div className="w-full">
      <Card className="mb-2">
        <CardContent className="max-w-full">
          <div className="mb-1 flex items-center justify-center gap-10 pt-2 sm:mb-2 xl:mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-3 w-3 lg:h-6 lg:w-6"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">
                Tidigare säsong
              </span>
            </Button>

            <div className="w-24">
              <Skeleton className="h-9 w-full" />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-3 w-3 lg:h-6 lg:w-6"
            >
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Senare säsong</span>
            </Button>
          </div>
          {/* <SeasonTabBar /> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default SingleSeasonSkeleton
