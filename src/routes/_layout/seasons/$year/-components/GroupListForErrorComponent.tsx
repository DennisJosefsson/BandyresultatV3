import { Link, useLoaderData } from '@tanstack/react-router'

const GroupListForErrorComponent = () => {
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })
  if (data.status !== 200) return null
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-3 xl:gap-x-16 xl:gap-y-8 2xl:grid-cols-6">
      {data.groups.map((item) => {
        return (
          <div
            className="flex w-full flex-row items-center justify-center gap-4 border px-4 py-2 sm:gap-8"
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
              <span className="xs:text-[10px] text-[8px] font-semibold sm:text-xs lg:text-sm">
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
