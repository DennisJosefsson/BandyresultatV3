import { getRouteApi } from '@tanstack/react-router'

import { Slider } from '@/components/base/ui/slider'
import { getCurrentIntervalTable } from '../../-functions/getCurrentIntervalTable'
import IntervalTable from './IntervalTable'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/interval',
)

const RangeData = () => {
  const data = route.useLoaderData()
  const navigate = route.useNavigate()
  const start = route.useSearch({ select: (s) => s.start })
  const end = route.useSearch({ select: (s) => s.end })
  if (data.status === 404) return null
  const range = [start, end ?? data.dates.length - 1]

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
    tables: data.tables,
  })
  if (!currTable) return null

  return (
    <div className="mx-1 sm:mx-4 flex flex-col gap-4">
      <div className="xs:text-[10px] flex flex-row justify-between text-[8px] sm:text-xs lg:text-base">
        <span className="w-24">{currTable.startDate}</span>
        <span className="font-semibold">
          {data.serie.serieName}
        </span>
        <span className="w-24 text-right">
          {currTable.endDate}
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={(value) =>
          valueChange(value as Array<number>)
        }
        minStepsBetweenValues={1}
        min={0}
        max={data.dates.length - 1}
        orientation="horizontal"
        // Höjden sätts explicit med "h-1" på track i slider.tsx för att synas.
      />
      <IntervalTable
        table={currTable.table}
        serie={data.serie}
      />
    </div>
  )
}

export default RangeData
