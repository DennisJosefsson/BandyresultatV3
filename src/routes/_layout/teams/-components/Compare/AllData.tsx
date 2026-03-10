import { getRouteApi } from '@tanstack/react-router'

import {
  Table,
  TableBody,
} from '@/components/base/ui/table'

import AllDataTableHeader from './AllDataTableHeader'
import DataTableRow from './DataTableRow'

const route = getRouteApi('/_layout/teams/compare')

const AllData = () => {
  const searchObject = route.useSearch()
  const data = route.useLoaderData()

  if (data.status === 200) {
    if (
      searchObject.teamArray &&
      searchObject.teamArray.length > 2
    ) {
      return (
        <div className="mb-6">
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {data.sortedData.map((team, index) => {
                return (
                  <DataTableRow
                    key={index}
                    team={team}
                  />
                )
              })}
            </TableBody>
          </Table>
        </div>
      )
    } else
      return (
        <div className="mb-6">
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {data.allData.slice(1).map((team, index) => {
                return (
                  <DataTableRow
                    key={index}
                    team={team}
                  />
                )
              })}
            </TableBody>
          </Table>
        </div>
      )
  } else if (data.status === 400) {
    return null
  }
}

export default AllData
