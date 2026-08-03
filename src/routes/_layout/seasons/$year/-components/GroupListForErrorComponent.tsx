import { Link, useLoaderData } from '@tanstack/react-router'

const GroupListForErrorComponent = () => {
  const data = useLoaderData({
    from: '/_layout/seasons/$year',
  })
  if (data.status !== 200) return null
  return (
    <div className="mx-auto mt-4 grid grid-cols-1 gap-2">
      {data.groups.map((item) => {
        return (
          <div
            className="flex w-full flex-row items-center justify-center gap-4 border shadow-xs md:shadow-sm px-4 py-2 sm:gap-8"
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
              <span className="xs:text-[10px] text-[8px] sm:text-xs lg:text-sm">
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
