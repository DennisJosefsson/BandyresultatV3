import { Skeleton } from '@/components/ui/skeleton'
import { Circle } from 'lucide-react'

const SeasonStatsSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col font-inter text-foreground w-full">
      <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Match- och resultatstatistik
      </h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44 mb-2">
        <div>
          {Array.from({ length: 6 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
        <div>
          <div className="mb-2 flex flex-col gap-2">
            <div className="text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
              Segrande lag
            </div>
            <div className="flex flex-row justify-center gap-2">
              <div className="flex flex-row items-center gap-1">
                <Circle
                  fill="currentColor"
                  className="h-3 w-3 fill-primary sm:h-4 sm:w-4"
                />
                <span className="text-[8px] text-foreground sm:text-sm">
                  Hemma
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Circle
                  fill="currentColor"
                  className="h-3 w-3 fill-[#f4f1bb] dark:fill-secondary sm:h-4 sm:w-4"
                />
                <span className="text-[8px] text-foreground sm:text-sm">
                  Borta
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Circle
                  fill="currentColor"
                  className="h-3 w-3 fill-[#9bc1bc] sm:h-4 sm:w-4"
                />
                <span className="text-[8px] text-foreground sm:text-sm">
                  Oavgjort
                </span>
              </div>
            </div>
          </div>
          <Skeleton className="w-[280px] aspect-square" />
        </div>
      </div>
      <div>
        <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
          Resultatstatistik kategori
        </h4>
        <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
          {Array.from({ length: 6 }).map((_i, index) => {
            return <Skeleton key={index} className="h-9 w-full mb-1" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonStatsSkeleton
