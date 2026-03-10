import { getRouteApi } from '@tanstack/react-router'

import {
  Table,
  TableBody,
} from '@/components/base/ui/table'
import { groupConstant } from '@/lib/utils/constants'

import { filterOpposition } from '../../-functions/utils/filterOpposition'
import AllDataTableHeader from './AllDataTableHeader'
import DataTableRow from './DataTableRow'

const route = getRouteApi('/_layout/teams/compare')

const DetailedData = () => {
  const searchObject = route.useSearch()

  const data = route.useLoaderData()
  if (data.status === 400) return null

  return (
    <div>
      {data.categoryData.map((level) => {
        return (
          <div
            key={level.level}
            className="mb-4"
          >
            <h4 className="text-[10px] md:text-sm mb-2">
              {level.levelName}
            </h4>

            <div>
              {level.tables.map((category) => {
                return (
                  <div
                    key={category.category}
                    className="mb-6"
                  >
                    <h6 className="text-[10px] md:text-sm">
                      {groupConstant[category.category]}
                    </h6>
                    <Table className="w-full table-fixed">
                      <AllDataTableHeader />
                      <TableBody>
                        {searchObject.teamArray &&
                          searchObject.teamArray.length >
                            2 &&
                          filterOpposition(
                            category.tables,
                          ).map((team, index) => {
                            return (
                              <DataTableRow
                                key={`${team.teamId}-${index}`}
                                team={team}
                              />
                            )
                          })}
                        {searchObject.teamArray &&
                          searchObject.teamArray.length ===
                            2 &&
                          category.tables
                            .slice(1)
                            .map((team, index) => {
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
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DetailedData
