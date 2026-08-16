import { Button } from '@/components/base/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/ui/popover'
import type { Game } from '@/lib/types/game'
import type { Serie } from '@/lib/types/serie'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import {
  Navigate,
  getRouteApi,
} from '@tanstack/react-router'
import DevelopmentClicker from './DevelopmentClicker'
import DevelopmentGamesList from './DevelopmentGamesList'
import DevelopmentTable from './DevelopmentTable'
import MobileDevelopmentTable from './MobileDevelopmentTable'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/development',
)

type DevelopmentDataProps = {
  tables: Array<{
    date: string
    table: Array<ReturnDevDataTableItem>
  }>
  games: Array<{
    date: string
    games: Array<Omit<Game, 'season'>>
  }>
  serie: Serie
  dates: Array<string>
}

const DevelopmentData = ({
  tables,
  games,
  serie,
  dates,
}: DevelopmentDataProps) => {
  const index = route.useSearch({ select: (s) => s.index })
  if (index >= dates.length) {
    return (
      <Navigate
        to="."
        params={(prev) => ({ ...prev })}
        search={(prev) => ({ ...prev, index: 0 })}
      />
    )
  }
  return (
    <div className="@container/dev font-inter text-foreground mx-auto flex w-full flex-col pt-2">
      <DevelopmentClicker dates={dates} />
      <div className="flex flex-row gap-x-12 items-center mt-2 sm:mt-4">
        <h3 className="text-primary text-xs font-semibold tracking-wider @md:text-sm">
          {serie.serieName}
        </h3>
        {serie.comment ? (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline">Kommentar</Button>
              }
            />
            <PopoverContent>
              <span className="p-2 text-xs @sm:text-sm font-semibold">
                {serie.comment}
              </span>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-2 @5xl/dev:grid-cols-7 @5xl/dev:gap-4 mt-2">
        <div className="@5xl/dev:col-span-3">
          <DevelopmentGamesList games={games} />
        </div>
        <div className="hidden @md/dev:block @5xl/dev:col-span-4 @5xl/dev:mt-6">
          <DevelopmentTable
            tables={tables}
            serie={serie}
          />
        </div>
        <div className="@md/dev:hidden">
          <MobileDevelopmentTable
            tables={tables}
            serie={serie}
          />
        </div>
      </div>
    </div>
  )
}

export default DevelopmentData
