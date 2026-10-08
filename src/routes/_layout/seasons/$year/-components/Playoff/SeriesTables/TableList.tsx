import type { PlayoffSeries } from '@/lib/types/table'
import DataTable from './DataTable'
import { columns } from './columns'

type TableListProps = {
  data: Array<PlayoffSeries>
}

const TableList = ({ data }: TableListProps) => {
  if (data.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Slutspelstabeller saknas för denna säsong.
        </p>
      </div>
    )
  }

  return (
    <div>
      {data.map((group) => {
        return (
          <div className="mb-6">
            <div
              id={group.group}
              className="group mb-0.5 flex flex-row items-center gap-1"
            >
              <h2 className="text-xs font-semibold tracking-wider @md:text-sm">
                {group.serieName}
              </h2>
            </div>

            <div>
              <DataTable
                columns={columns}
                data={group.groupArray}
                serieStructure={group.serieStructure}
              />
              {group.comment && (
                <p className="bg-background p-1 text-[8px] md:text-xs">
                  {group.comment}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
