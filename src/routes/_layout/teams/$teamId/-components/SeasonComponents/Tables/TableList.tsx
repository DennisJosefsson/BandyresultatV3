import { GroupTable } from '@/lib/types/table'
import DataTable from './DataTable'

type TableListProps = {
  tableArray: GroupTable[]
  casualName: string
}

const TableList = ({ tableArray, casualName }: TableListProps) => {
  if (tableArray.length === 0) {
    return (
      <div className="font-inter text-foreground mx-auto mt-4 grid place-items-center py-5 text-sm font-bold md:text-base">
        <p className="mx-10 text-center">
          Serietabeller saknas för denna säsong.
        </p>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        return (
          <div key={group.group} className="mb-6">
            <div
              id={group.group}
              className="group mb-0.5 flex flex-row items-center gap-1"
            >
              <h2 className="text-sm font-bold tracking-wide lg:text-base xl:text-xl">
                {group.name}
              </h2>
            </div>

            <div>
              <DataTable
                data={group.tables}
                casualName={casualName}
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
