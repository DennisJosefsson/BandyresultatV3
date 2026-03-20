import { getRouteApi } from '@tanstack/react-router'

import { columns } from './columns'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'

const route = getRouteApi(
  '/_layout/maraton/table/$maratonTable',
)

const TableList = () => {
  const tables = route.useLoaderData({
    select: (s) => s.tables,
  })

  const teamObject = tables.reduce(
    (o, key) => ({
      ...o,
      [key.team.casualName]: key.teamId,
    }),
    {},
  )
  return (
    <div className="mb-6">
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={tables}
          teamObject={teamObject}
        />
      </div>
      <div className="md:hidden">
        <MobileDataTable
          columns={columns}
          data={tables}
          teamObject={teamObject}
        />
      </div>
    </div>
  )
}

export default TableList
