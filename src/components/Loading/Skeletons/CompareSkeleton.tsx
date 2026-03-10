import { useMediaQuery } from 'usehooks-ts'

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

const CompareSkeleton = () => {
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <div className="mt-2 w-full">
      <div className="md:p-2">
        <div className="w-full">
          <div className="mb-2 flex flex-row items-center justify-between">
            <div className="mb-2">
              <Skeleton className="h-4 w-32 md:h-6" />
            </div>

            <div className="mb-2 flex flex-row justify-end gap-2 xl:mb-6">
              <Button size={matches ? 'sm' : 'xxs'}>
                Länk
              </Button>
            </div>
          </div>
          <Skeleton className="h-2.5 w-32 md:h-4" />
        </div>
      </div>
      <div>
        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger
              value="tables"
              className="text-[10px] md:text-sm"
            >
              Tabeller
            </TabsTrigger>
            <TabsTrigger
              value="games"
              className="text-[10px] md:text-sm"
            >
              Matcher
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="text-[10px] md:text-sm"
            >
              Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <Card className="mb-2">
              <CardHeader className="mb-4 p-2">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <Skeleton className="mb-1 h-6 w-full" />
                <Skeleton className="mb-1 h-6 w-full" />
              </CardContent>
            </Card>
            <Card className="mb-2">
              <CardHeader className="mb-4 p-2">
                <CardTitle className="text-[10px] md:text-sm">
                  <Skeleton className="h-5 w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <Skeleton className="mb-1 h-6 w-full" />
                <Skeleton className="mb-1 h-6 w-full" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CompareSkeleton
