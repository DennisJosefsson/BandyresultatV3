import { getRouteApi } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/ui/card'
import {
  Table,
  TableBody,
} from '@/components/base/ui/table'

import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

const route = getRouteApi('/_layout/teams/$teamId')

const TeamTable = () => {
  const data = route.useLoaderData()
  if (data.status === 404) return null
  if (data.tables.length === 0) {
    return (
      <div className="mt-4 flex flex-row justify-center">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas tabelldata för detta lag.
        </h2>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {data.tables.map((level) => {
        return (
          <Card
            key={level.level}
            size="sm"
            className="mb-2"
          >
            <CardHeader>
              <CardTitle className="text-[10px] md:text-sm">
                {level.levelName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {level.tables.map((table) => {
                return (
                  <div key={table.category}>
                    <h6 className="text-[10px] md:text-xs lg:text-sm xl:text-base">
                      {table.categoryName}
                    </h6>
                    <Table className="w-full table-fixed">
                      <TeamTableHeader />
                      <TableBody>
                        <TeamTableRow
                          table={table.tables}
                        />
                      </TableBody>
                    </Table>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default TeamTable
