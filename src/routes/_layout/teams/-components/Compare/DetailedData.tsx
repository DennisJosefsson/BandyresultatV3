import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody } from '@/components/ui/table'
import { groupConstant } from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'

import { filterOpposition } from '../../-functions/utils/filterOpposition'
import AllDataTableHeader from './AllDataTableHeader'
import DataTableRow from './DataTableRow'

const route = getRouteApi('/_layout/teams/compare')

const DetailedData = () => {
  const searchObject = route.useSearch()

  const { categoryData } = route.useLoaderData()

  return (
    <div>
      {categoryData.map((level) => {
        return (
          <Card key={level.level} className="mb-2">
            <CardHeader className="p-2">
              <CardTitle className="text-[10px] md:text-sm">
                {level.levelName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              {level.tables.map((category) => {
                return (
                  <div key={category.category} className="mb-2">
                    <h6 className="text-[10px] md:text-sm">
                      {groupConstant[category.category]}
                    </h6>
                    <Table className="w-full table-fixed">
                      <AllDataTableHeader />
                      <TableBody>
                        {searchObject.teamArray &&
                          searchObject.teamArray.length > 2 &&
                          filterOpposition(category.tables).map(
                            (team, index) => {
                              return (
                                <DataTableRow
                                  key={`${team.teamId}-${index}`}
                                  team={team}
                                />
                              )
                            },
                          )}
                        {searchObject.teamArray &&
                          searchObject.teamArray.length === 2 &&
                          category.tables.slice(1).map((team, index) => {
                            return (
                              <DataTableRow
                                key={`${team.teamId}-${index}`}
                                team={team}
                              />
                            )
                          })}
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

export default DetailedData
