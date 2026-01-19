import { getRouteApi } from '@tanstack/react-router'
import { columns } from './columns'
import DataTable from './DataTable'

const route = getRouteApi('/_layout/maraton/table/$maratonTable')

const TableList = () => {
  const tables = route.useLoaderData()

  const teamObject = tables.reduce(
    (o, key) => ({ ...o, [key.team.casualName]: key.teamId }),
    {},
  )
  return (
    <div className="mb-6">
      <div>
        <DataTable columns={columns} data={tables} teamObject={teamObject} />
      </div>
    </div>
  )
}

export default TableList
