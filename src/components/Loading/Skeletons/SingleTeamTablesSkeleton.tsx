import { Skeleton } from '@/components/base/ui/skeleton'

const SingleTeamTablesSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-2 sm:mt-4">
      <div className="msm:hidden">
        <Skeleton className="w-full h-6" />
      </div>
      <div>
        {[
          {
            division: '1',
            tables: [
              { category: 'first' },
              { category: 'second' },
            ],
          },
          {
            division: '2',
            tables: [
              { category: 'first' },
              { category: 'second' },
            ],
          },
        ].map((division) => {
          return (
            <div
              key={division.division}
              className="mb-2"
            >
              <div className="mb-2">
                <span className="text-[10px] font-semibold md:text-sm">
                  <Skeleton className="w-25 h-6" />
                </span>
              </div>
              <div>
                {division.tables.map((table) => {
                  return (
                    <div
                      key={table.category}
                      className="@container/teamtable"
                    >
                      <h6 className="text-[10px] font-semibold md:text-xs lg:text-sm xl:text-base">
                        <Skeleton className="w-25 h-6" />
                      </h6>
                      <div className="@lg:block hidden w-full p-2 @3xl:w-160">
                        <Skeleton className="w-full h-10" />
                        <Skeleton className="w-full h-9" />
                      </div>
                      <div className="@lg:hidden">
                        <Skeleton className="w-full h-10" />
                        <Skeleton className="w-full h-9" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleTeamTablesSkeleton
