import { getRouteApi } from '@tanstack/react-router'

import {
  eightColStarts,
  eightColStartsFourTeams,
} from '@/lib/utils/constants'

import DefaultComponent from './DefaultComponent'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const EightFinal = () => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.eightTables) return null
  if (data.eightTables.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        {data.eightTables.map((group, index) => {
          return (
            <DefaultComponent
              key={`${group.group}-${index}`}
              group={group}
              colStarts={eightColStarts}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
      {data.eightTables.map((group, index) => {
        return (
          <DefaultComponent
            key={`${group.group}-${index}`}
            group={group}
            colStarts={eightColStartsFourTeams}
          />
        )
      })}
    </div>
  )
}

export default EightFinal
