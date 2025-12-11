import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { getRouteApi } from '@tanstack/react-router'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

const route = getRouteApi('/_layout/team/$teamId')

const TeamTable = () => {
  const tables = route.useLoaderData({ select: (data) => data.tables })
  if (tables.length === 0) {
    return (
      <div className="flex flex-row justify-center mt-4">
        <h2 className="text-xs font-bold md:text-sm">
          Tyvärr saknas tabelldata för detta lag.
        </h2>
      </div>
    )
  }
  return (
    <div className="mb-6">
      {tables.map((level) => {
        return (
          <Card key={level.level} className="mb-2 sm:mb-4 md:mb-6 p-1 md:p-2">
            <CardHeader className="p-1 md:p-2">
              <CardTitle className="text-[10px] md:text-sm lg:text-base xl:text-lg">
                {level.levelName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1 md:p-2">
              {level.tables.map((table) => {
                return (
                  <div key={table.category}>
                    <h6 className="text-[10px] md:text-xs lg:text-sm xl:text-base">
                      {table.categoryName}
                    </h6>
                    <Table className="w-full table-fixed">
                      <TeamTableHeader />
                      <TableBody>
                        <TeamTableRow table={table.tables} />
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
