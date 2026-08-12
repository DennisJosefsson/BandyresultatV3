import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base/ui/accordion'
import { Skeleton } from '@/components/base/ui/skeleton'

const SeasonGameListSkeleton = () => {
  return (
    <div className="@container/games mx-1 flex flex-col gap-2 @sm/playoff:gap-4">
      <Accordion className="bg-secondary border">
        <AccordionItem className="rounded-md p-0.5 @sm/games:p-2">
          <AccordionTrigger className="text-[10px] @sm/games:text-xs @md/games:text-sm">
            Sidinställningar
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-4 @5xl:grid @5xl:grid-cols-2 mt-2">
        <div>
          <Skeleton className="h-5 w-40 mb-1" />
          <div className="border px-1 py-0.5 @2xl:px-2 shadow-xs @3xl:shadow-sm">
            {Array.from({ length: 12 }).map((_i, index) => {
              return (
                <Skeleton
                  key={index}
                  className="mb-1 h-28 w-full"
                />
              )
            })}
          </div>
        </div>
        <div>
          <Skeleton className="h-5 w-40 mb-1" />
          <div className="border px-1 py-0.5 @2xl:px-2 shadow-xs @3xl:shadow-sm">
            {Array.from({ length: 12 }).map((_i, index) => {
              return (
                <Skeleton
                  key={index}
                  className="mb-1 h-28 w-full"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonGameListSkeleton
