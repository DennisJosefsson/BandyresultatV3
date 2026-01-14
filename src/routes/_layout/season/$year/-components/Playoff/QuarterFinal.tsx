import {
  quarterColStarts,
  quarterColStartsTwoQuarter,
} from '@/lib/utils/constants'
import { getRouteApi } from '@tanstack/react-router'

import DefaultComponent from './DefaultComponent'

const route = getRouteApi('/_layout/season/$year/playoff/table')

const QuarterFinal = () => {
  const quarterFinals = route.useLoaderData({ select: (s) => s.quarterTables })
  if (!quarterFinals) return null

  if (quarterFinals.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        {quarterFinals.map((group, index) => {
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
      {quarterFinals.map((group, index) => (
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
