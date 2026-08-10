import { Await, getRouteApi } from '@tanstack/react-router'

import SeasonTableSkeleton from '@/components/Loading/Skeletons/SeasonTableSkeleton'
import MobileDataTable from './MobileDataTable'
import { columns } from './columns'
import { Comment, SerieName } from './sharedComponents'

const route = getRouteApi(
  '/_layout/seasons/$year/$group/tables/$table',
)

const MobileTableList = () => {
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
        if (data.status === 404) return null

        if (data.tables.length === 0) {
          return (
            <div className="grid py-5 mx-auto mt-4 text-sm font-bold font-inter text-foreground place-items-center md:text-base">
              <p className="mx-10 text-center">
                Serietabeller saknas för denna säsong.
              </p>
            </div>
          )
        }

        return (
          <div className="mb-6">
            <div
              id={data.serie.group}
              className="group mb-0.5 flex flex-row items-center gap-1"
            >
              <SerieName>{data.serie.serieName}</SerieName>
            </div>

            <div>
              <MobileDataTable
                columns={columns}
                data={data.tables}
                serieStructure={data.serie.serieStructure}
              />
              {data.serie.comment ? (
                <Comment>data.serie.comment</Comment>
              ) : null}
            </div>
          </div>
        )
      }}
    </Await>
  )
}

export default MobileTableList
