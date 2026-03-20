import { Button } from '@/components/base/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import { Skeleton } from '@/components/base/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/base/ui/tabs'

const SingleTeamSkeleton = () => {
  return (
    <div className="font-inter text-foreground mt-2 flex min-h-screen w-full flex-col">
      <CardHeader className="p-1 md:p-6">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>
            <Skeleton className="h-6 w-16" />
          </CardTitle>

          <div>
            <div>
              <Button size="responsive">Favoritlag</Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-6">
        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger
              className="text-[10px] md:text-sm"
              value="tables"
            >
              Tabeller
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] md:text-sm"
              value="fiveSeasons"
            >
              Senaste säsongerna
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] md:text-sm"
              value="stats"
            >
              Statistik
            </TabsTrigger>
            <TabsTrigger
              className="text-[10px] md:text-sm"
              value="chart"
            >
              Diagram
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tables">
            <Card className="mb-2 p-1 sm:mb-4 md:mb-6 md:p-6">
              <CardHeader className="p-1 md:p-6">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-6 w-16" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-6">
                {Array.from({ length: 2 }).map(
                  (_i, index) => {
                    return (
                      <Skeleton
                        key={index}
                        className="mb-1 h-9 w-full"
                      />
                    )
                  },
                )}
              </CardContent>
            </Card>
            <Card className="mb-2 p-1 sm:mb-4 md:mb-6 md:p-6">
              <CardHeader className="p-1 md:p-6">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-6 w-16" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-6">
                {Array.from({ length: 2 }).map(
                  (_i, index) => {
                    return (
                      <Skeleton
                        key={index}
                        className="mb-1 h-9 w-full"
                      />
                    )
                  },
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  )
}

export default SingleTeamSkeleton
