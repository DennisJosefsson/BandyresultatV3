import { getRouteApi } from '@tanstack/react-router'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'
import { columns } from './columns'

const route = getRouteApi(
  '/_layout/maraton/table/$maratonTable',
)

const TableList = () => {
  const tables = route.useLoaderData({
    select: (s) => s.tables,
  })

  return (
    <div className="@container/maraton">
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={tables}
        />
      </div>
      <div className="md:hidden">
        <MobileDataTable
          columns={columns}
          data={tables}
        />
      </div>
    </div>
  )
}

export default TableList
