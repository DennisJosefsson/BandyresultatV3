import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SeasonPlayoffSkeleton = () => {
  return (
    <div className="m-0 mt-4 lg:justify-self-center w-full">
      <div className="grid gap-2">
        <div className="grid w-auto min-w-[33%] grid-cols-1 justify-center lg:mx-auto">
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
          <Card className="lg:col-start-2">
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
          <Card className="lg:col-start-4">
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="w-full h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SeasonPlayoffSkeleton
