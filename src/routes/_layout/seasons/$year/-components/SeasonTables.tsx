import SeasonTableSkeleton from '@/components/Loading/Skeletons/SeasonTableSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import GroupListForErrorComponent from './GroupListForErrorComponent'
import MobileTableList from './Tables/MobileTableList'
import SeasonTablesButtonList from './Tables/SeasonTablesButtonList'
import TableList from './Tables/TableList'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/tables/$table',
)

const SeasonTables = () => {
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })
  return (
    <Await
      promise={promiseData}
      fallback={<SeasonTableSkeleton />}
    >
      {(data) => {
        if (!data) return null
        if (data.status === 404) {
          return (
            <div className="mt-4 flex flex-col justify-center text-sm">
              <div className="mb-4 flex flex-row justify-center">
                <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
                  {data.message}
                </span>
              </div>

              {data.message.includes(
                'Välj en ny i listan',
              ) ? (
                <GroupListForErrorComponent />
              ) : null}
            </div>
          )
        }
        return (
          <div className="@container/tables">
            <SeasonTablesButtonList serie={data.serie} />
            <div className="hidden @md/tables:block">
              <TableList
                tables={data.tables}
                serie={data.serie}
              />
            </div>
            <div className="@md/tables:hidden">
              <MobileTableList
                tables={data.tables}
                serie={data.serie}
              />
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default SeasonTables
