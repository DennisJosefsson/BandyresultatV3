import { Link, useLoaderData } from '@tanstack/react-router'

const GroupListForErrorComponent = () => {
  const data = useLoaderData({ from: '/_layout/seasons/$year' })
  if (data.status !== 200) return null
  return (
    <div className="grid grid-cols-5 gap-x-2">
      {data.groups.map((item) => {
        return (
          <div className="w-full text-nowrap" key={item.group}>
            <Link
              to="."
              params={(prev) => ({ ...prev, group: item.group })}
              search={(prev) => ({ women: prev.women })}
            >
              {item.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default GroupListForErrorComponent
