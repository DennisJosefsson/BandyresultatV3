import { staticGroupTable } from '@/lib/types/tables/seasonTable'
import { z } from 'zod'
import DataTable from './StaticDataTable'

type StaticTableListProps = {
  tableObject: z.infer<typeof staticGroupTable> | undefined
  casualName: string
}

const StaticTableList = ({ tableObject, casualName }: StaticTableListProps) => {
  if (tableObject === undefined) return null

  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {tableObject.name}
        </h2>

        <div>
          <DataTable
            casualName={casualName}
            data={tableObject.tables}
            serieStructure={tableObject.serieStructure}
          />
          {tableObject.comment != null && (
            <p className="bg-background p-1 text-xs font-bold">
              {tableObject.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
