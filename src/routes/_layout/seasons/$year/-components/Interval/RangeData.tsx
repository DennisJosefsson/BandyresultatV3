import { Slider } from '@/components/base/ui/slider'
import type { Serie } from '@/lib/types/serie'
import type { ReturnDevDataTableItem } from '@/lib/types/table'
import { getRouteApi } from '@tanstack/react-router'
import { getCurrentIntervalTable } from '../../-functions/devAndInt/getCurrentIntervalTable'
import IntervalTable from './IntervalTable'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/interval',
)

type RangeDataProps = {
  tables: Array<{
    date: string
    table: Array<ReturnDevDataTableItem>
  }>
  serie: Serie
  dates: Array<string>
}

const RangeData = ({
  tables,

  serie,
  dates,
}: RangeDataProps) => {
  const navigate = route.useNavigate()
  const start = route.useSearch({ select: (s) => s.start })
  const end = route.useSearch({ select: (s) => s.end })

  const range = [start, end ?? dates.length - 1]

  const valueChange = (value: Array<number>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        start: value[0],
        end: value[1],
      }),
    })
  }

  const currTable = getCurrentIntervalTable({
    range,
    tables: tables,
  })
  if (!currTable) return null

  return (
    <div className="mx-1 flex flex-col gap-4 sm:mx-4">
      <div className="text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm xl:text-base flex flex-row justify-between">
        <span className="w-24">
          {dates.length < 2 ? null : currTable.startDate}
        </span>
        <span className="font-semibold">
          {serie.serieName}
        </span>
        <span className="w-24 text-right">
          {dates.length < 2 ? null : currTable.endDate}
        </span>
      </div>
      {dates.length < 2 ? null : (
        <Slider
          value={range}
          onValueChange={(value) =>
            valueChange(value as Array<number>)
          }
          minStepsBetweenValues={1}
          min={0}
          max={dates.length - 1}
          orientation="horizontal"
          // Höjden sätts explicit med "h-1" på track i slider.tsx för att synas.
        />
      )}

      <IntervalTable
        table={currTable.table}
        serie={serie}
      />
      <div>
        <span className="p-1 sm:p-2 text-[10px] xs:text-xs md:text-sm font-semibold">
          {serie.comment}
        </span>
      </div>
    </div>
  )
}

export default RangeData
