import type { FiveSeason } from '@/lib/types/team'
import { Table, TableBody } from '@/components/base/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/base/ui/card'
import TeamTableRow from './TableComponents/TeamTableDataRow'
import TeamTableHeader from './TableComponents/TableHeader'

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
          <Card key={table.group} className="mb-2" size="sm">
            <CardHeader>
              <CardTitle className="xs:group-data-[size=sm]/card:text-xs group-data-[size=sm]/card:text-[10px] md:group-data-[size=sm]/card:text-sm">
                {`${table.serie.serieName} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
