import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from 'usehooks-ts'

const SingleTeamSkeleton = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground w-full">
      <CardHeader className="p-1 md:p-6">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>
            <Skeleton className="h-6 w-16" />
          </CardTitle>

          <div>
            <div>
              <Button size={matches ? 'sm' : 'xxs'}>Favoritlag</Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-6">
        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger className="text-[10px] md:text-sm" value="tables">
              Tabeller
            </TabsTrigger>
            <TabsTrigger className="text-[10px] md:text-sm" value="fiveSeasons">
              Senaste säsongerna
            </TabsTrigger>
            <TabsTrigger className="text-[10px] md:text-sm" value="stats">
              Statistik
            </TabsTrigger>
            <TabsTrigger className="text-[10px] md:text-sm" value="chart">
              Diagram
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tables">
            <Card className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-6">
              <CardHeader className="p-1 md:p-6">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-6 w-16" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-6">
                {Array.from({ length: 2 }).map((_i, index) => {
                  return <Skeleton key={index} className="h-9 w-full mb-1" />
                })}
              </CardContent>
            </Card>
            <Card className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-6">
              <CardHeader className="p-1 md:p-6">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-6 w-16" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-1 md:p-6">
                {Array.from({ length: 2 }).map((_i, index) => {
                  return <Skeleton key={index} className="h-9 w-full mb-1" />
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  )
}

export default SingleTeamSkeleton
