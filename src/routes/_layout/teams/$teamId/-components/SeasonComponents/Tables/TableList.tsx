import type { GroupTable } from '@/lib/types/table'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'

type TableListProps = {
  tableArray: Array<GroupTable>
}

const Comment = ({ comment }: { comment: string }) => {
  return (
    <p className="p-1 text-[8px] md:text-xs">{comment}</p>
  )
}

const TableList = ({ tableArray }: TableListProps) => {
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
          <div
            key={group.group}
            className="mb-6"
          >
            <div
              id={group.group}
              className="group mb-0.5 flex flex-row items-center gap-1"
            >
              <h3 className="text-primary text-[10px] font-semibold tracking-wide md:text-xs xl:text-sm 2xl:text-base">
                {group.name}
              </h3>
            </div>

            <div className="hidden flex-col gap-2 sm:flex">
              <DataTable
                data={group.tables}
                serieStructure={group.serieStructure}
              />
              {group.comment ? (
                <Comment comment={group.comment} />
              ) : null}
            </div>
            <div className="flex flex-col gap-2 sm:hidden">
              <MobileDataTable
                data={group.tables}
                serieStructure={group.serieStructure}
              />
              {group.comment ? (
                <Comment comment={group.comment} />
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
