import { getRouteApi } from '@tanstack/react-router'
import { semiColStarts } from '@/lib/utils/constants'
import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/seasons/$year/playoff/table')

type ComponentProps = {
  hoverTeam: number | null
  handleOnMouseEnter: (teamId: number) => void
  handleOnMouseLeave: () => void
}

const SemiFinal = (props: ComponentProps) => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.semiTables) return null

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
      {data.semiTables.map((group, index) => (
        <DefaultComponent
          key={`${group.group}-${index}`}
          group={group}
          colStarts={semiColStarts}
          {...props}
        />
      ))}
    </div>
  )
}

export default SemiFinal
