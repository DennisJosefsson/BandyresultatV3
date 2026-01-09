import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils/utils'
import { getRouteApi } from '@tanstack/react-router'
import Classnames from 'embla-carousel-class-names'
import { useEffect, useState } from 'react'

const route = getRouteApi('/_layout/season/$year/$group/development')

const DevelopmentClicker = () => {
  const navigate = route.useNavigate()
  const dates = route.useLoaderData({ select: (s) => s.dates })
  const index = route.useSearch({ select: (s) => s.index })

  const [api, setApi] = useState<CarouselApi>()
  const [dateApi, setDateApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api || !dateApi) return
    api.on('select', () => {
      navigate({
        search: (prev) => ({ ...prev, index: api.selectedScrollSnap() }),
      })
      dateApi.scrollTo(api.selectedScrollSnap(), true)
    })
  }, [dates, api, dateApi])

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="mb-1 flex flex-row items-center justify-center">
        <Carousel
          setApi={setApi}
          className="xxs:max-w-xs xs:w-[60%] w-[50%] max-w-60 self-center sm:max-w-sm md:max-w-2xl"
          opts={{
            loop: true,
            containScroll: 'keepSnaps',
            startIndex: index,
          }}
          plugins={[Classnames()]}
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: dates.length }).map((_, arrIndex) => {
              return (
                <CarouselItem
                  key={arrIndex}
                  className="flex flex-row items-center justify-center p-0 text-[10px] sm:text-xs lg:text-lg"
                >
                  Matchdag {arrIndex + 1}
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="h-3 w-3 lg:h-6 lg:w-6" />
          <CarouselNext className="h-3 w-3 lg:h-6 lg:w-6" />
        </Carousel>
      </div>
      <div className="mb-2 flex flex-row items-center justify-center">
        <Carousel
          className="xxs:max-w-xs xs:w-[60%] w-[50%] max-w-60 self-center sm:max-w-sm md:max-w-2xl"
          setApi={setDateApi}
          opts={{
            containScroll: 'keepSnaps',
            dragFree: true,
            loop: true,
            startIndex: index,
          }}
          plugins={[Classnames()]}
        >
          <CarouselContent>
            {dates.map((date, arrIndex) => {
              return (
                <CarouselItem
                  key={date}
                  className={cn(
                    'flex basis-1/3 cursor-pointer flex-row items-center justify-center p-0 text-[8px] md:basis-1/5 md:text-sm [.is-snapped]:font-semibold',
                    { 'basis-full': dates.length < 5 },
                  )}
                  onClick={() => api && api.scrollTo(arrIndex, true)}
                >
                  {date}
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="h-3 w-3 lg:h-6 lg:w-6" />
          <CarouselNext className="h-3 w-3 lg:h-6 lg:w-6" />
        </Carousel>
      </div>
    </div>
  )
}

export default DevelopmentClicker
