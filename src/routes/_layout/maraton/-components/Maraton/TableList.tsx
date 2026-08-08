import MaratonSkeleton from '@/components/Loading/Skeletons/MaratonSkeleton'
import { Await, getRouteApi } from '@tanstack/react-router'
import DataTable from './DataTable'
import MobileDataTable from './MobileDataTable'
import { columns } from './columns'

const route = getRouteApi(
  '/_layout/maraton/table/$maratonTable',
)

const TableList = () => {
  const promiseData = route.useLoaderData({
    select: (s) => s.data,
  })

  return (
    <Await
      promise={promiseData}
      fallback={<MaratonSkeleton />}
    >
      {(data) => {
        if (!data) return null

        const tables = data.tables
        return (
          <div className="@container/maraton">
            <div className="hidden md:block">
              <DataTable
                columns={columns}
                data={tables}
              />
            </div>
            <div className="md:hidden">
              <MobileDataTable
                columns={columns}
                data={tables}
              />
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default TableList
