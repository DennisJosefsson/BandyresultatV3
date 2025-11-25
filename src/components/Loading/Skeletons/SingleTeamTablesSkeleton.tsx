import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const SingleTeamTablesSkeleton = () => {
  return (
    <div className="mt-2 flex min-h-screen flex-col font-inter text-foreground w-full">
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <Button variant="ghost" aria-label="Gå till föregående säsong">
              <div className="inline-flex gap-1 items-center">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="hidden sm:block">Föregående</span>
              </div>
            </Button>

            <h4 className="font-semibold text-sm md:text-lg">
              <Skeleton className="h-6 w-32" />
            </h4>

            <Button variant="ghost" aria-label="Gå till nästa säsong">
              <div className="inline-flex gap-1 items-center">
                <span className="hidden sm:block">Nästa</span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Button>
          </div>

          <Tabs defaultValue="tables">
            <TabsList>
              <TabsTrigger className="text-[10px] md:text-sm" value="tables">
                Tabeller
              </TabsTrigger>
              <TabsTrigger className="text-[10px] md:text-sm" value="games">
                Matcher
              </TabsTrigger>
              <TabsTrigger className="text-[10px] md:text-sm" value="upcoming">
                Ospelade matcher
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tables">
              {Array.from({ length: 10 }).map((_i, index) => {
                return <Skeleton key={index} className="h-9 w-full mb-1" />
              })}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </div>
  )
}

export default SingleTeamTablesSkeleton
