import { PlayoffSeriesTable } from '@/lib/types/table'
import { columns } from './columns'
import DataTable from './DataTable'

type TableListProps = {
  data: PlayoffSeriesTable
}

const TableList = ({ data }: TableListProps) => {
  if (data.tables.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Slutspelstabeller saknas för denna säsong.
        </p>
      </div>
    )
  }
  const teamObject = data.tables.reduce(
    (o, key) => ({ ...o, [key.team.casualName]: key.teamId }),
    {},
  )
  return (
    <div className="mb-6">
      <div
        id={data.group}
        className="group mb-0.5 flex flex-row items-center gap-1"
      >
        <h2 className="text-sm font-bold tracking-wide lg:text-base xl:text-xl">
          {data.name}
        </h2>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data.tables}
          teamObject={teamObject}
          serieStructure={data.serieStructure}
        />
        {data.comment && (
          <p className="bg-background p-1 text-[8px] md:text-xs">
            {data.comment}
          </p>
        )}
      </div>
    </div>
  )
}

export default TableList
