import { getRouteApi } from '@tanstack/react-router'
import { eightColStarts, eightColStartsFourTeams } from '@/lib/utils/constants'
import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/seasons/$year/playoff/table')

type ComponentProps = {
  hoverTeam: number | null
  handleOnMouseEnter: (teamId: number) => void
  handleOnMouseLeave: () => void
}

const EightFinal = (props: ComponentProps) => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.eightTables) return null
  if (data.eightTables.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-5">
        {data.eightTables.map((group, index) => {
          return (
            <DefaultComponent
              key={`${group.group}-${index}`}
              group={group}
              colStarts={eightColStarts}
              {...props}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-4">
      {data.eightTables.map((group, index) => {
        return (
          <DefaultComponent
            key={`${group.group}-${index}`}
            group={group}
            colStarts={eightColStartsFourTeams}
            {...props}
          />
        )
      })}
    </div>
  )
}

export default EightFinal
