import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
//import SeasonTabBar from '../../Season/SeasonTabBar'

const SingleSeasonSkeleton = () => {
  return (
    <div className="w-full">
      <Card className="mb-2">
        <CardContent className="max-w-full">
          <div className="pt-2 mb-1 flex gap-10 items-center justify-center sm:mb-2 xl:mb-4">
            <Button
              variant="outline"
              size="icon"
              className="h-3 w-3 lg:h-6 lg:w-6"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Tidigare säsong</span>
            </Button>

            <div className="w-24">
              <Skeleton className="w-full h-9" />
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
