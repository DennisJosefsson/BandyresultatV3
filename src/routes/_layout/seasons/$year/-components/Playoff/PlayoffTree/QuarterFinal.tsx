import { getRouteApi } from '@tanstack/react-router'

import {
  quarterColStarts,
  quarterColStartsTwoQuarter,
} from '@/lib/utils/constants'

import DefaultComponent from './DefaultComponent'

const route = getRouteApi(
  '/_layout/seasons/$year/playoff/table',
)

const QuarterFinal = () => {
  const data = route.useLoaderData()

  if (data.status === 404 || !data.quarterTables)
    return null

  if (data.quarterTables.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        {data.quarterTables.map((group, index) => {
          return (
            <DefaultComponent
              key={`${group.group}-${index}`}
              group={group}
              colStarts={quarterColStartsTwoQuarter}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
      {data.quarterTables.map((group, index) => (
        <DefaultComponent
          key={`${group.group}-${index}`}
          group={group}
          colStarts={quarterColStarts}
        />
      ))}
    </div>
  )
}

export default QuarterFinal
