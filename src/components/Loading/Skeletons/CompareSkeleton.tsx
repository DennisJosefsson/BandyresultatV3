import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from 'usehooks-ts'

const CompareSkeleton = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <div className="mt-2 w-full">
      <div className="md:p-2">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center mb-2">
            <div className="mb-2">
              <Skeleton className="h-4 md:h-6 w-32" />
            </div>

            <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
              <Button size={matches ? 'sm' : 'xxs'}>Länk</Button>
            </div>
          </div>
          <Skeleton className="h-2.5 md:h-4 w-32" />
        </div>
      </div>
      <div>
        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables" className="text-[10px] md:text-sm">
              Tabeller
            </TabsTrigger>
            <TabsTrigger value="games" className="text-[10px] md:text-sm">
              Matcher
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-[10px] md:text-sm">
              Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <Card className="mb-2">
              <CardHeader className="p-2 mb-4">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <Skeleton className="h-6 w-full mb-1" />
                <Skeleton className="h-6 w-full mb-1" />
              </CardContent>
            </Card>
            <Card className="mb-2">
              <CardHeader className="p-2 mb-4">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <Skeleton className="h-6 w-full mb-1" />
                <Skeleton className="h-6 w-full mb-1" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CompareSkeleton
