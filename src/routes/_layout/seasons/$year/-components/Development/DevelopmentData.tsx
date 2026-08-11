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
      <div>
        <DevelopmentClicker dates={dates} />

        <div className="grid grid-cols-1 gap-2 @5xl/dev:grid-cols-7 @5xl/dev:gap-4">
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
    </div>
  )
}

export default DevelopmentData
