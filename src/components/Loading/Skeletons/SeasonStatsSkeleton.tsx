import { Circle } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'

const SeasonStatsSkeleton = () => {
  return (
    <div className="font-inter text-foreground mx-auto flex w-full flex-col">
      <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Match- och resultatstatistik
      </h4>
      <div className="mb-2 grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <div>
          {Array.from({ length: 6 }).map((_i, index) => {
            return <Skeleton key={index} className="mb-1 h-9 w-full" />
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
                  className="fill-primary h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-foreground text-[8px] sm:text-sm">
                  Hemma
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Circle
                  fill="currentColor"
                  className="dark:fill-secondary h-3 w-3 fill-[#f4f1bb] sm:h-4 sm:w-4"
                />
                <span className="text-foreground text-[8px] sm:text-sm">
                  Borta
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Circle
                  fill="currentColor"
                  className="h-3 w-3 fill-[#9bc1bc] sm:h-4 sm:w-4"
                />
                <span className="text-foreground text-[8px] sm:text-sm">
                  Oavgjort
                </span>
              </div>
            </div>
          </div>
          <Skeleton className="aspect-square w-[280px]" />
        </div>
      </div>
      <div>
        <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
          Resultatstatistik kategori
        </h4>
        <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
          {Array.from({ length: 6 }).map((_i, index) => {
            return <Skeleton key={index} className="mb-1 h-9 w-full" />
          })}
        </div>
      </div>
    </div>
  )
}

export default SeasonStatsSkeleton
