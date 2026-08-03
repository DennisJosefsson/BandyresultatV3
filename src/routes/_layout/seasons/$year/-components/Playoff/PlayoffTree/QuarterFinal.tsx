import { getRouteApi } from '@tanstack/react-router'
import { quarterColStarts, quarterColStartsTwoQuarter } from '@/lib/utils/constants'
import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/seasons/$year/playoff/table')

type ComponentProps = {
  hoverTeam: number | null
  handleOnMouseEnter: (teamId: number) => void
  handleOnMouseLeave: () => void
}

const QuarterFinal = (props: ComponentProps) => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.quarterTables) return null

  if (data.quarterTables.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-5">
        {data.quarterTables.map((group, index) => {
          return (
            <DefaultComponent
              key={`${group.group}-${index}`}
              group={group}
              colStarts={quarterColStartsTwoQuarter}
              {...props}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-4">
      {data.quarterTables.map((group, index) => (
        <DefaultComponent
          key={`${group.group}-${index}`}
          group={group}
          colStarts={quarterColStarts}
          {...props}
        />
      ))}
    </div>
  )
}

export default QuarterFinal
