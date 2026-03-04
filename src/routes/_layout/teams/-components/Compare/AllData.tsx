import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'

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
        <Card className="mb-2">
          <CardHeader className="p-2">
            <CardTitle className="text-[10px] md:text-sm">
              Sammanlagt
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
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
          </CardContent>
        </Card>
      )
    } else
      return (
        <Card className="mb-2">
          <CardHeader className="p-2">
            <CardTitle className="text-[10px] md:text-sm">
              Sammanlagt
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <Table className="w-full table-fixed">
              <AllDataTableHeader />
              <TableBody>
                {data.allData
                  .slice(1)
                  .map((team, index) => {
                    return (
                      <DataTableRow
                        key={index}
                        team={team}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )
  } else if (data.status === 400) {
    return null
  }
}

export default AllData
