import { Link, useLoaderData } from '@tanstack/react-router'

const GroupListForErrorComponent = () => {
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })
  if (data.status !== 200) return null
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-3 xl:gap-x-16 xl:gap-y-8 2xl:grid-cols-6 mt-4">
      {data.groups.map((item) => {
        return (
          <div
            className="flex w-full flex-row justify-center items-center gap-4 sm:gap-8 border px-4 py-2"
            key={item.group}
          >
            <Link
              to="."
              params={(prev) => ({
                ...prev,
                group: item.group,
              })}
              search={(prev) => ({ women: prev.women })}
            >
              <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm font-semibold">
                {item.name}
              </span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default GroupListForErrorComponent
