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
      <div>
        <Skeleton className="h-6 w-20 mb-1" />
        <Skeleton className="h-6 w-30 mb-1" />
        <Skeleton className="h-4 w-40 mb-1" />
        <div className="border px-1 py-0.5 @2xl:px-2 shadow-xs @3xl:shadow-sm max-w-3xl">
          {Array.from({ length: 42 }).map((_i, index) => {
            return (
              <Skeleton
                key={index}
                className="mb-1 h-9 w-full"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonGameListSkeleton
