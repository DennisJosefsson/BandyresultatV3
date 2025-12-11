import { groupTable } from '@/lib/types/tables/seasonTable'
import { z } from 'zod'
import DataTable from './DataTable'

type TableListProps = {
  tableArray: z.infer<typeof groupTable>[]
  casualName: string
}

const TableList = ({ tableArray, casualName }: TableListProps) => {
  if (tableArray.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
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
              className="flex flex-row gap-1 items-center mb-0.5 group"
            >
              <h2 className="text-sm font-bold lg:text-base xl:text-xl tracking-wide">
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
