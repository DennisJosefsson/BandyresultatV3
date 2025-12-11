import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'

import { FiveSeason } from '../-functions/getLastFiveSeasons'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'

const FiveSeasonTeamTable = ({
  tables,
  season = '',
}: {
  tables: FiveSeason['tables']
  season?: string
}) => {
  return (
    <div className="mb-6">
      {tables.map((table, index) => {
        return (
          <Card key={table.group} className="mb-2 p-1 sm:mb-4 md:mb-6 md:p-2">
            <CardHeader className="p-1 md:p-2">
              <CardTitle className="text-[10px] md:text-sm">
                {`${table.serie.serieName} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-1 md:p-2">
              <Table className="w-full table-fixed">
                <TeamTableHeader />
                <TableBody>
                  <TeamTableRow table={table} key={index} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default FiveSeasonTeamTable
